import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  initializeApp as initAdminApp,
  getApps as getAdminApps,
  getApp as getAdminApp,
  type App as AdminApp,
} from 'firebase-admin/app';
import {
  getAuth as getAdminAuth,
  type Auth as AdminAuth,
  type UserRecord as AdminUserRecord,
} from 'firebase-admin/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };
import type {
  AdminRecord,
  AdminPublicProfile,
  AdminSession,
  AdminRole,
  AdminStatus,
} from './src/types/adminAuth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase App for persistent activity/audit logs
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Admin SDK for privileged server-side administrative authority
let firebaseAdminApp: AdminApp | null = null;
let firebaseAdminAuth: AdminAuth | null = null;

try {
  if (!getAdminApps().length) {
    firebaseAdminApp = initAdminApp({
      projectId: firebaseConfig.projectId,
    });
  } else {
    firebaseAdminApp = getAdminApp();
  }
  firebaseAdminAuth = getAdminAuth(firebaseAdminApp);
  console.log('[SECURITY] Firebase Admin SDK initialized for project:', firebaseConfig.projectId);
} catch (err: any) {
  console.warn('[SECURITY] Firebase Admin SDK initialization fallback:', err?.message || err);
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);

// -------------------------------------------------------------
// Secure Persistent Local Data Stores
// -------------------------------------------------------------
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

function loadAdmins(): Map<string, AdminRecord> {
  const map = new Map<string, AdminRecord>();
  if (fs.existsSync(ADMINS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf-8'));
      if (Array.isArray(data)) {
        data.forEach((admin: AdminRecord) => {
          map.set(admin.adminId.toUpperCase(), admin);
        });
      }
    } catch (err) {
      console.error('Error reading admins file:', err);
    }
  }
  return map;
}

function saveAdmins(admins: Map<string, AdminRecord>) {
  try {
    const list = Array.from(admins.values());
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving admins file:', err);
  }
}

function loadSessions(): Map<string, AdminSession> {
  const map = new Map<string, AdminSession>();
  if (fs.existsSync(SESSIONS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
      if (Array.isArray(data)) {
        const now = Date.now();
        data.forEach((s: AdminSession) => {
          if (new Date(s.expiresAt).getTime() > now) {
            map.set(s.token, s);
          }
        });
      }
    } catch (err) {
      console.error('Error reading sessions file:', err);
    }
  }
  return map;
}

function saveSessions(sessions: Map<string, AdminSession>) {
  try {
    const list = Array.from(sessions.values());
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving sessions file:', err);
  }
}

const adminsStore = loadAdmins();
const sessionsStore = loadSessions();

// Brute-force protection tracker: key is `${adminId}:${ip}`
interface FailedAttemptTracker {
  count: number;
  lastAttempt: number;
  lockedUntil: number | null;
}
const failedAttemptsMap = new Map<string, FailedAttemptTracker>();

// -------------------------------------------------------------
// Cryptography Helpers
// -------------------------------------------------------------
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, generatedSalt, 100000, 64, 'sha256')
    .toString('hex');
  return { hash, salt: generatedSalt };
}

function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const computedHash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha256')
      .toString('hex');
    const storedBuf = Buffer.from(storedHash, 'hex');
    const computedBuf = Buffer.from(computedHash, 'hex');
    if (storedBuf.length !== computedBuf.length) return false;
    return crypto.timingSafeEqual(storedBuf, computedBuf);
  } catch (err) {
    return false;
  }
}

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// -------------------------------------------------------------
// Security Audit Logging (Firestore + Server Console)
// -------------------------------------------------------------
async function logSecurityEvent(
  adminId: string,
  action: string,
  details: string,
  req?: Request
) {
  const ip = req?.headers['x-forwarded-for'] || req?.socket.remoteAddress || 'unknown';
  const userAgent = req?.headers['user-agent'] || 'unknown';
  const timestamp = new Date().toISOString();

  const logEntry = {
    adminId,
    action,
    details,
    ipAddress: String(ip),
    userAgent: String(userAgent),
    timestamp,
  };

  try {
    await addDoc(collection(db, 'activity_logs'), {
      adminEmail: adminId,
      adminName: adminId,
      action,
      entity: 'auth',
      description: `[SECURITY] ${action}: ${details}`,
      metadata: logEntry,
      timestamp,
    });
  } catch (err) {
    console.warn('Notice: Firestore audit write deferred (offline mode active)');
  }

  console.log(`[AUDIT] ${timestamp} | ${action} | Admin: ${adminId} | ${details}`);
}

// -------------------------------------------------------------
// Super Admin Bootstrap
// -------------------------------------------------------------
const INITIAL_SUPER_ADMIN_ID = 'KR-ADMIN-001';
const INITIAL_PASSWORD = process.env.INITIAL_SUPER_ADMIN_PASSWORD || 'KingdomRise#2026!Admin';

function bootstrapSuperAdmin() {
  if (!adminsStore.has(INITIAL_SUPER_ADMIN_ID)) {
    console.log(`Provisioning initial SUPER_ADMIN account (${INITIAL_SUPER_ADMIN_ID})...`);
    const { hash, salt } = hashPassword(INITIAL_PASSWORD);

    const superAdmin: AdminRecord = {
      adminId: INITIAL_SUPER_ADMIN_ID,
      fullName: 'Kingdom Rise Super Administrator',
      email: 'admin@kingdomrise.com',
      phone: '+966-12-650-0000',
      passwordHash: hash,
      salt,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      failedLoginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      createdBy: 'SYSTEM_PROVISION',
    };

    adminsStore.set(INITIAL_SUPER_ADMIN_ID, superAdmin);
    saveAdmins(adminsStore);
    console.log(`[SECURITY] Super Admin initialized. ID: ${INITIAL_SUPER_ADMIN_ID}`);
  }
}

// -------------------------------------------------------------
// Authentication & Role Middleware
// -------------------------------------------------------------
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  if (!token && req.cookies?.krc_admin_session) {
    token = req.cookies.krc_admin_session;
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required.' });
  }

  const session = sessionsStore.get(token);
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
    if (session) {
      sessionsStore.delete(token);
      saveSessions(sessionsStore);
    }
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  const admin = adminsStore.get(session.adminId.toUpperCase());
  if (!admin) {
    sessionsStore.delete(token);
    saveSessions(sessionsStore);
    return res.status(401).json({ error: 'Admin account not found.' });
  }

  if (admin.status !== 'ACTIVE') {
    sessionsStore.delete(token);
    saveSessions(sessionsStore);
    return res.status(403).json({ error: `Account is ${admin.status}. Access denied.` });
  }

  (req as any).adminSession = session;
  (req as any).adminRecord = admin;
  next();
}

function requireRole(allowedRoles: AdminRole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const adminRecord = (req as any).adminRecord as AdminRecord;
    if (!adminRecord || !allowedRoles.includes(adminRecord.role)) {
      if (req.method === 'DELETE' && req.path.startsWith('/api/admin/administrators/')) {
        await logSecurityEvent(
          adminRecord?.adminId || 'UNAUTHORIZED',
          'UNAUTHORIZED_DELETION_ATTEMPT',
          `Unauthorized attempt to delete administrator at ${req.originalUrl} by [${adminRecord?.role || 'NONE'}] account`,
          req
        );
      }
      return res.status(403).json({
        error: `Forbidden: Requires one of [${allowedRoles.join(', ')}] role privileges.`,
      });
    }
    next();
  };
}

// -------------------------------------------------------------
// Admin Authentication Endpoints
// -------------------------------------------------------------

// POST /api/admin/login
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const { adminId, password } = req.body;

  if (!adminId || !password || typeof adminId !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Admin ID and password are required.' });
  }

  const cleanAdminId = adminId.trim().toUpperCase();
  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');

  // Rate Limiting & Brute Force Lockout Check
  const trackerKey = `${cleanAdminId}:${clientIp}`;
  const now = Date.now();
  const tracker = failedAttemptsMap.get(trackerKey) || {
    count: 0,
    lastAttempt: now,
    lockedUntil: null,
  };

  if (tracker.lockedUntil && tracker.lockedUntil > now) {
    const remainingMins = Math.ceil((tracker.lockedUntil - now) / 60000);
    return res.status(429).json({
      error: `Too many failed attempts. Access temporarily locked for ${remainingMins} minute(s).`,
    });
  }

  const admin = adminsStore.get(cleanAdminId);

  // If Admin ID does not exist: Generic rejection
  if (!admin) {
    tracker.count += 1;
    tracker.lastAttempt = now;
    if (tracker.count >= 5) {
      tracker.lockedUntil = now + 15 * 60 * 1000;
    }
    failedAttemptsMap.set(trackerKey, tracker);

    await logSecurityEvent(
      cleanAdminId,
      'LOGIN_FAILURE',
      `Failed login: Admin ID does not exist from IP ${clientIp}`,
      req
    );

    return res.status(401).json({ error: 'Invalid administrator credentials.' });
  }

  // If account is SUSPENDED or DISABLED: Reject
  if (admin.status !== 'ACTIVE') {
    await logSecurityEvent(
      cleanAdminId,
      'LOGIN_FAILURE',
      `Login rejected: Account status is ${admin.status}`,
      req
    );
    return res.status(401).json({ error: 'Invalid administrator credentials.' });
  }

  // Verify password hash
  const isPasswordValid = verifyPassword(password, admin.passwordHash, admin.salt);
  if (!isPasswordValid) {
    tracker.count += 1;
    tracker.lastAttempt = now;
    if (tracker.count >= 5) {
      tracker.lockedUntil = now + 15 * 60 * 1000;
    }
    failedAttemptsMap.set(trackerKey, tracker);

    await logSecurityEvent(
      cleanAdminId,
      'LOGIN_FAILURE',
      `Incorrect password attempt ${tracker.count} of 5 from IP ${clientIp}`,
      req
    );

    return res.status(401).json({ error: 'Invalid administrator credentials.' });
  }

  // Success: Clear rate limit tracker
  failedAttemptsMap.delete(trackerKey);

  // Generate secure session token (expires in 8 hours)
  const sessionToken = generateSecureToken();
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

  const session: AdminSession = {
    token: sessionToken,
    adminId: admin.adminId,
    fullName: admin.fullName,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    createdAt: new Date().toISOString(),
    expiresAt,
  };

  sessionsStore.set(sessionToken, session);
  saveSessions(sessionsStore);

  // Update admin record last login
  admin.lastLogin = new Date().toISOString();
  admin.failedLoginAttempts = 0;
  admin.lockedUntil = null;
  adminsStore.set(admin.adminId, admin);
  saveAdmins(adminsStore);

  // Set HTTP-only cookie
  res.cookie('krc_admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000,
  });

  await logSecurityEvent(cleanAdminId, 'LOGIN_SUCCESS', 'Administrator successfully authenticated', req);

  const publicProfile: AdminPublicProfile = {
    adminId: admin.adminId,
    fullName: admin.fullName,
    email: admin.email,
    phone: admin.phone,
    role: admin.role,
    status: admin.status,
    createdAt: admin.createdAt,
    lastLogin: admin.lastLogin,
    createdBy: admin.createdBy,
  };

  return res.json({
    success: true,
    session,
    admin: publicProfile,
  });
});

// POST /api/admin/logout
app.post('/api/admin/logout', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  let token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  if (!token && req.cookies?.krc_admin_session) {
    token = req.cookies.krc_admin_session;
  }

  if (token) {
    const session = sessionsStore.get(token);
    if (session) {
      await logSecurityEvent(session.adminId, 'LOGOUT', 'Administrator signed out', req);
    }
    sessionsStore.delete(token);
    saveSessions(sessionsStore);
  }

  res.clearCookie('krc_admin_session');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/admin/session
app.get('/api/admin/session', requireAuth, (req: Request, res: Response) => {
  const admin = (req as any).adminRecord as AdminRecord;
  const session = (req as any).adminSession as AdminSession;

  const publicProfile: AdminPublicProfile = {
    adminId: admin.adminId,
    fullName: admin.fullName,
    email: admin.email,
    phone: admin.phone,
    role: admin.role,
    status: admin.status,
    createdAt: admin.createdAt,
    lastLogin: admin.lastLogin,
    createdBy: admin.createdBy,
  };

  return res.json({
    authenticated: true,
    admin: publicProfile,
    session,
  });
});

// -------------------------------------------------------------
// Administrator Management Endpoints (SUPER_ADMIN ONLY)
// -------------------------------------------------------------

function generateNextAdminId(): string {
  let maxIdNum = 1;
  for (const adminId of adminsStore.keys()) {
    const match = adminId.match(/^KR-ADMIN-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  }
  const nextNum = maxIdNum + 1;
  return `KR-ADMIN-${String(nextNum).padStart(3, '0')}`;
}

// GET /api/admin/administrators
app.get(
  '/api/admin/administrators',
  requireAuth,
  requireRole(['SUPER_ADMIN']),
  (req: Request, res: Response) => {
    const admins: AdminPublicProfile[] = [];
    for (const data of adminsStore.values()) {
      admins.push({
        adminId: data.adminId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
        createdBy: data.createdBy,
      });
    }
    admins.sort((a, b) => a.adminId.localeCompare(b.adminId));
    return res.json({ admins });
  }
);

// POST /api/admin/administrators
app.post(
  '/api/admin/administrators',
  requireAuth,
  requireRole(['SUPER_ADMIN']),
  async (req: Request, res: Response) => {
    const { fullName, email, phone, role, password } = req.body;
    const creator = (req as any).adminRecord as AdminRecord;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ error: 'Full name, email, role, and password are required.' });
    }

    if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const newAdminId = generateNextAdminId();
    const { hash, salt } = hashPassword(password);

    const newRecord: AdminRecord = {
      adminId: newAdminId,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      passwordHash: hash,
      salt,
      role,
      status: 'ACTIVE',
      failedLoginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      createdBy: creator.adminId,
    };

    adminsStore.set(newAdminId, newRecord);
    saveAdmins(adminsStore);

    await logSecurityEvent(
      creator.adminId,
      'ACCOUNT_CREATION',
      `Provisioned administrator ${newAdminId} (${newRecord.fullName}, role: ${role})`,
      req
    );

    const publicProfile: AdminPublicProfile = {
      adminId: newRecord.adminId,
      fullName: newRecord.fullName,
      email: newRecord.email,
      phone: newRecord.phone,
      role: newRecord.role,
      status: newRecord.status,
      createdAt: newRecord.createdAt,
      lastLogin: null,
      createdBy: newRecord.createdBy,
    };

    return res.status(201).json({ success: true, admin: publicProfile });
  }
);

// PATCH /api/admin/administrators/:adminId/status
app.patch(
  '/api/admin/administrators/:adminId/status',
  requireAuth,
  requireRole(['SUPER_ADMIN']),
  async (req: Request, res: Response) => {
    const targetAdminId = req.params.adminId.toUpperCase();
    const { status } = req.body;
    const operator = (req as any).adminRecord as AdminRecord;

    if (!['ACTIVE', 'SUSPENDED', 'DISABLED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be ACTIVE, SUSPENDED, or DISABLED.' });
    }

    if (operator.adminId === targetAdminId && status !== 'ACTIVE') {
      return res.status(400).json({ error: 'You cannot suspend or disable your own active session.' });
    }

    const admin = adminsStore.get(targetAdminId);
    if (!admin) {
      return res.status(404).json({ error: 'Administrator not found.' });
    }

    admin.status = status;
    admin.updatedAt = new Date().toISOString();
    adminsStore.set(targetAdminId, admin);
    saveAdmins(adminsStore);

    // If suspended or disabled, terminate active sessions
    if (status !== 'ACTIVE') {
      for (const [token, s] of sessionsStore.entries()) {
        if (s.adminId === targetAdminId) {
          sessionsStore.delete(token);
        }
      }
      saveSessions(sessionsStore);
    }

    const action =
      status === 'ACTIVE'
        ? 'ACCOUNT_ACTIVATED'
        : status === 'SUSPENDED'
        ? 'ACCOUNT_SUSPENDED'
        : 'ACCOUNT_DISABLED';

    await logSecurityEvent(
      operator.adminId,
      action,
      `Changed status of ${targetAdminId} to ${status}`,
      req
    );

    return res.json({ success: true, adminId: targetAdminId, status });
  }
);

// POST /api/admin/administrators/:adminId/reset-password
app.post(
  '/api/admin/administrators/:adminId/reset-password',
  requireAuth,
  requireRole(['SUPER_ADMIN']),
  async (req: Request, res: Response) => {
    const targetAdminId = req.params.adminId.toUpperCase();
    const { newPassword } = req.body;
    const operator = (req as any).adminRecord as AdminRecord;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    const admin = adminsStore.get(targetAdminId);
    if (!admin) {
      return res.status(404).json({ error: 'Administrator not found.' });
    }

    const { hash, salt } = hashPassword(newPassword);
    admin.passwordHash = hash;
    admin.salt = salt;
    admin.failedLoginAttempts = 0;
    admin.lockedUntil = null;
    admin.updatedAt = new Date().toISOString();
    adminsStore.set(targetAdminId, admin);
    saveAdmins(adminsStore);

    for (const key of failedAttemptsMap.keys()) {
      if (key.startsWith(`${targetAdminId}:`)) {
        failedAttemptsMap.delete(key);
      }
    }

    await logSecurityEvent(
      operator.adminId,
      'PASSWORD_RESET',
      `Password reset executed for ${targetAdminId}`,
      req
    );

    return res.json({ success: true, message: `Password reset successfully for ${targetAdminId}.` });
  }
);

// DELETE /api/admin/administrators/:adminId
app.delete(
  '/api/admin/administrators/:adminId',
  requireAuth,
  requireRole(['SUPER_ADMIN']),
  async (req: Request, res: Response) => {
    const targetAdminId = req.params.adminId.trim().toUpperCase();
    const operator = (req as any).adminRecord as AdminRecord;
    const reason = req.body?.reason ? String(req.body.reason).trim() : 'Administrative revocation by Super Admin';
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
    const userAgent = String(req.headers['user-agent'] || 'unknown');
    const logTimestamp = new Date().toISOString();

    // 1. Prevent Super Admin from deleting their own account
    if (operator.adminId === targetAdminId) {
      await logSecurityEvent(
        operator.adminId,
        'DELETION_BLOCKED',
        `Self-deletion attempt blocked for ${operator.adminId}`,
        req
      );
      return res.status(400).json({ error: 'Self-Protection Rule: You cannot delete your own Super Admin account.' });
    }

    const targetAdmin = adminsStore.get(targetAdminId);
    if (!targetAdmin) {
      return res.status(404).json({ error: `Administrator record ${targetAdminId} not found.` });
    }

    // 2. Ensure at least one active Super Admin account always remains
    const activeSuperAdmins = Array.from(adminsStore.values()).filter(
      (a) => a.role === 'SUPER_ADMIN' && a.status === 'ACTIVE'
    );

    if (targetAdmin.role === 'SUPER_ADMIN' && targetAdmin.status === 'ACTIVE' && activeSuperAdmins.length <= 1) {
      await logSecurityEvent(
        operator.adminId,
        'DELETION_BLOCKED',
        `Attempt to delete the last active Super Admin (${targetAdminId}) was blocked.`,
        req
      );
      return res.status(400).json({
        error: 'Protection Violation: Cannot delete the last active Super Admin account. At least one active Super Admin must always exist in the system.',
      });
    }

    // 3. Delete from Firebase Authentication using Firebase Admin SDK
    let firebaseAuthDeleted = false;
    let firebaseAuthError: string | null = null;

    if (firebaseAdminAuth) {
      try {
        let authUser: AdminUserRecord | null = null;
        if (targetAdmin.email) {
          try {
            authUser = await firebaseAdminAuth.getUserByEmail(targetAdmin.email);
          } catch (e: any) {
            if (e.code !== 'auth/user-not-found') {
              console.warn('[SECURITY] Firebase Auth user lookup by email error:', e?.message || e);
            }
          }
        }
        if (!authUser && targetAdmin.adminId) {
          try {
            authUser = await firebaseAdminAuth.getUser(targetAdmin.adminId);
          } catch (e: any) {
            if (e.code !== 'auth/user-not-found') {
              console.warn('[SECURITY] Firebase Auth user lookup by UID error:', e?.message || e);
            }
          }
        }

        if (authUser) {
          await firebaseAdminAuth.deleteUser(authUser.uid);
          firebaseAuthDeleted = true;
          console.log(`[SECURITY] Firebase Auth account permanently deleted: ${authUser.uid} (${targetAdmin.email})`);
        } else {
          firebaseAuthDeleted = true; // Not present in Firebase Auth, considered clean
        }
      } catch (authErr: any) {
        firebaseAuthError = authErr?.message || 'Failed to delete from Firebase Authentication';
        console.warn('[SECURITY] Firebase Auth deletion notice:', firebaseAuthError);
      }
    }

    // 4. Firestore: Delete admin document and archive
    try {
      await deleteDoc(doc(db, 'admins', targetAdminId));
      if (targetAdmin.email) {
        await deleteDoc(doc(db, 'admins', targetAdmin.email.toLowerCase()));
      }
    } catch (fsErr: any) {
      console.warn('[SECURITY] Firestore admin doc deletion note:', fsErr?.message || fsErr);
    }

    try {
      await addDoc(collection(db, 'archived_administrators'), {
        adminId: targetAdmin.adminId,
        fullName: targetAdmin.fullName,
        email: targetAdmin.email,
        phone: targetAdmin.phone || null,
        role: targetAdmin.role,
        status: targetAdmin.status,
        originalCreatedAt: targetAdmin.createdAt,
        deletedAt: logTimestamp,
        deletedByAdminId: operator.adminId,
        deletedByEmail: operator.email,
        reason,
        firebaseAuthDeleted,
      });
    } catch (archErr: any) {
      console.warn('[SECURITY] Firestore admin archival note:', archErr?.message || archErr);
    }

    // 5. Invalidate Local Store, Sessions, and Lockout Trackers
    adminsStore.delete(targetAdminId);
    saveAdmins(adminsStore);

    for (const [token, s] of sessionsStore.entries()) {
      if (s.adminId === targetAdminId || s.email?.toLowerCase() === targetAdmin.email.toLowerCase()) {
        sessionsStore.delete(token);
      }
    }
    saveSessions(sessionsStore);

    for (const key of failedAttemptsMap.keys()) {
      if (key.startsWith(`${targetAdminId}:`)) {
        failedAttemptsMap.delete(key);
      }
    }

    // 6. Security Audit Logging
    try {
      await addDoc(collection(db, 'activity_logs'), {
        adminEmail: operator.email || operator.adminId,
        adminName: operator.fullName || operator.adminId,
        action: 'ADMIN_DELETED',
        entity: 'administrators',
        description: `[SECURITY] Super Admin ${operator.adminId} (${operator.email}) permanently deleted administrator ${targetAdmin.adminId} (${targetAdmin.email}, role: ${targetAdmin.role}). Reason: ${reason}`,
        metadata: {
          actingSuperAdminUid: operator.adminId,
          actingSuperAdminEmail: operator.email,
          deletedAdminUid: targetAdmin.adminId,
          deletedAdminId: targetAdmin.adminId,
          deletedAdminEmail: targetAdmin.email,
          deletedAdminRole: targetAdmin.role,
          reason,
          status: 'SUCCESS',
          firebaseAuthDeleted,
          timestamp: logTimestamp,
          ipAddress: clientIp,
          userAgent,
        },
        timestamp: logTimestamp,
      });
    } catch (logErr: any) {
      console.warn('[SECURITY] Audit log write deferred (offline mode):', logErr?.message || logErr);
    }

    console.log(`[AUDIT] ${logTimestamp} | ADMIN_DELETED | Acting Super Admin: ${operator.adminId} | Deleted: ${targetAdminId} (${targetAdmin.email}) | Reason: ${reason}`);

    return res.json({
      success: true,
      message: `Administrator ${targetAdmin.adminId} (${targetAdmin.fullName}) has been permanently deleted.`,
    });
  }
);

// GET /api/admin/audit-logs
app.get(
  '/api/admin/audit-logs',
  requireAuth,
  requireRole(['SUPER_ADMIN', 'ADMIN']),
  async (req: Request, res: Response) => {
    try {
      const logsQuery = query(
        collection(db, 'activity_logs'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      const snap = await getDocs(logsQuery);
      const logs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ logs });
    } catch (err) {
      return res.json({ logs: [] });
    }
  }
);

// -------------------------------------------------------------
// Admin Quotation Requests Endpoints
// -------------------------------------------------------------
app.get(
  '/api/admin/quotes',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const q = query(
        collection(db, 'quote_requests'),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const snap = await getDocs(q);
      const quotes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ quotes });
    } catch (err) {
      console.warn('Error fetching quotes on server:', err);
      return res.json({ quotes: [] });
    }
  }
);

app.patch(
  '/api/admin/quotes/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'quote_requests', id);
      await updateDoc(ref, {
        ...req.body,
        updatedAt: new Date().toISOString(),
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update quote request.' });
    }
  }
);

app.delete(
  '/api/admin/quotes/:id',
  requireAuth,
  requireRole(['SUPER_ADMIN', 'ADMIN']),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'quote_requests', id);
      await deleteDoc(ref);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete quote request.' });
    }
  }
);

// -------------------------------------------------------------
// Admin Tender Submissions Endpoints
// -------------------------------------------------------------
app.get(
  '/api/admin/tenders',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const q = query(
        collection(db, 'tender_submissions'),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const snap = await getDocs(q);
      const tenders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ tenders });
    } catch (err) {
      console.warn('Error fetching tenders on server:', err);
      return res.json({ tenders: [] });
    }
  }
);

app.patch(
  '/api/admin/tenders/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'tender_submissions', id);
      await updateDoc(ref, {
        ...req.body,
        updatedAt: new Date().toISOString(),
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update tender submission.' });
    }
  }
);

app.delete(
  '/api/admin/tenders/:id',
  requireAuth,
  requireRole(['SUPER_ADMIN', 'ADMIN']),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'tender_submissions', id);
      await deleteDoc(ref);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete tender submission.' });
    }
  }
);

// -------------------------------------------------------------
// Admin Contact Messages Endpoints
// -------------------------------------------------------------
app.get(
  '/api/admin/messages',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const q = query(
        collection(db, 'contact_messages'),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const snap = await getDocs(q);
      const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ messages });
    } catch (err) {
      console.warn('Error fetching contact messages on server:', err);
      return res.json({ messages: [] });
    }
  }
);

app.patch(
  '/api/admin/messages/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'contact_messages', id);
      await updateDoc(ref, {
        ...req.body,
        updatedAt: new Date().toISOString(),
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update contact message.' });
    }
  }
);

app.delete(
  '/api/admin/messages/:id',
  requireAuth,
  requireRole(['SUPER_ADMIN', 'ADMIN']),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ref = doc(db, 'contact_messages', id);
      await deleteDoc(ref);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete contact message.' });
    }
  }
);

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------
async function startServer() {
  bootstrapSuperAdmin();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kingdom Rise Company full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
