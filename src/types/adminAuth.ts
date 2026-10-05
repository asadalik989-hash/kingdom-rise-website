/**
 * Administrator Identity & Authentication Models
 * Kingdom Rise Company (KRC)
 * Strict Zero-Trust Admin ID Model
 */

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export type AdminStatus = 'ACTIVE' | 'SUSPENDED' | 'DISABLED';

export interface AdminRecord {
  adminId: string; // e.g. "KR-ADMIN-001"
  fullName: string;
  email: string;
  phone?: string;
  passwordHash: string; // PBKDF2 with SHA-256 (hex)
  salt: string; // 32-byte cryptographic salt (hex)
  role: AdminRole;
  status: AdminStatus;
  failedLoginAttempts: number;
  lockedUntil: string | null; // ISO timestamp
  createdAt: string; // ISO timestamp
  lastLogin: string | null; // ISO timestamp
  createdBy: string; // e.g. "SYSTEM_PROVISION" or creator's Admin ID
  updatedAt?: string;
}

export interface AdminPublicProfile {
  adminId: string;
  fullName: string;
  email: string;
  phone?: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  lastLogin: string | null;
  createdBy: string;
}

export interface AdminSession {
  token: string;
  adminId: string;
  fullName: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  expiresAt: string; // ISO string
}

export interface AdminSecurityLog {
  id: string;
  adminId: string;
  action:
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILURE'
    | 'LOGOUT'
    | 'ACCOUNT_CREATION'
    | 'ACCOUNT_SUSPENDED'
    | 'ACCOUNT_ACTIVATED'
    | 'ACCOUNT_DISABLED'
    | 'PASSWORD_RESET'
    | 'ROLE_CHANGED'
    | 'ACCOUNT_REVOKED';
  details: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
