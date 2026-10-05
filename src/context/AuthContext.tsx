import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  AdminPublicProfile,
  AdminRole,
  AdminStatus,
} from '../types/adminAuth';
import { adminAuthClient } from '../services/adminAuthClient';

interface AuthContextType {
  adminProfile: AdminPublicProfile | null;
  role: AdminRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isLoading: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  login: (adminId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  administrators: AdminPublicProfile[];
  loadAdministrators: () => Promise<void>;
  createAdministrator: (params: {
    fullName: string;
    email: string;
    phone?: string;
    role: AdminRole;
    password: string;
  }) => Promise<AdminPublicProfile>;
  updateAdminStatus: (adminId: string, status: AdminStatus) => Promise<void>;
  resetAdminPassword: (adminId: string, newPassword: string) => Promise<void>;
  deleteAdministrator: (adminId: string, reason?: string) => Promise<void>;
  auditLogs: any[];
  loadAuditLogs: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState<AdminPublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [administrators, setAdministrators] = useState<AdminPublicProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Check active session on mount
  useEffect(() => {
    let mounted = true;
    async function verify() {
      setIsLoading(true);
      try {
        const { authenticated, admin } = await adminAuthClient.checkSession();
        if (mounted) {
          if (authenticated && admin) {
            setAdminProfile(admin);
          } else {
            setAdminProfile(null);
          }
        }
      } catch (err) {
        if (mounted) setAdminProfile(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    verify();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (adminId: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await adminAuthClient.login(adminId, password);
      setAdminProfile(res.admin);
    } catch (err: any) {
      const message = err.message || 'Invalid administrator credentials.';
      setAuthError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await adminAuthClient.logout();
    } finally {
      setAdminProfile(null);
      setAdministrators([]);
      setAuditLogs([]);
      setIsLoading(false);
    }
  };

  const loadAdministrators = useCallback(async () => {
    if (adminProfile?.role !== 'SUPER_ADMIN') return;
    try {
      const list = await adminAuthClient.listAdministrators();
      setAdministrators(list);
    } catch (err) {
      console.error('Failed to load administrators:', err);
    }
  }, [adminProfile?.role]);

  const createAdministrator = async (params: {
    fullName: string;
    email: string;
    phone?: string;
    role: AdminRole;
    password: string;
  }) => {
    const created = await adminAuthClient.createAdministrator(params);
    await loadAdministrators();
    return created;
  };

  const updateAdminStatus = async (adminId: string, status: AdminStatus) => {
    await adminAuthClient.updateAdminStatus(adminId, status);
    await loadAdministrators();
  };

  const resetAdminPassword = async (adminId: string, newPassword: string) => {
    await adminAuthClient.resetAdminPassword(adminId, newPassword);
  };

  const deleteAdministrator = async (adminId: string, reason?: string) => {
    await adminAuthClient.deleteAdministrator(adminId, reason);
    await loadAdministrators();
    await loadAuditLogs();
  };

  const loadAuditLogs = useCallback(async () => {
    try {
      const logs = await adminAuthClient.fetchAuditLogs();
      setAuditLogs(logs);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    }
  }, []);

  const role = adminProfile?.role || null;
  const isAuthenticated = !!adminProfile && adminProfile.status === 'ACTIVE';
  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isAdmin = role === 'ADMIN' || isSuperAdmin;
  const isEditor = role === 'EDITOR' || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        adminProfile,
        role,
        isAuthenticated,
        isAdmin,
        isSuperAdmin,
        isEditor,
        isLoading,
        authError,
        setAuthError,
        login,
        logout,
        administrators,
        loadAdministrators,
        createAdministrator,
        updateAdminStatus,
        resetAdminPassword,
        deleteAdministrator,
        auditLogs,
        loadAuditLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
