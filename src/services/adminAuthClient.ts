/**
 * Client Service for Admin ID Authentication & Administrator Management
 * Kingdom Rise Company (KRC)
 * Zero-Trust Architecture
 */

import {
  AdminPublicProfile,
  AdminSession,
  AdminStatus,
  AdminRole,
} from '../types/adminAuth';

const TOKEN_KEY = 'krc_admin_token';
const PROFILE_KEY = 'krc_admin_profile';

export const adminAuthClient = {
  // Store session in localStorage for Authorization: Bearer fallback
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setSession(session: AdminSession, admin: AdminPublicProfile) {
    try {
      localStorage.setItem(TOKEN_KEY, session.token);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(admin));
    } catch (e) {
      console.warn('Could not store session in localStorage:', e);
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(PROFILE_KEY);
    } catch (e) {
      // ignore
    }
  },

  getStoredProfile(): AdminPublicProfile | null {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async login(adminId: string, password: string): Promise<{ session: AdminSession; admin: AdminPublicProfile }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid administrator credentials.');
    }

    this.setSession(data.session, data.admin);
    return data;
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (e) {
      console.warn('Logout API warning:', e);
    } finally {
      this.clearSession();
    }
  },

  async checkSession(): Promise<{ authenticated: boolean; admin: AdminPublicProfile | null }> {
    const token = this.getToken();
    try {
      const res = await fetch('/api/admin/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        this.clearSession();
        return { authenticated: false, admin: null };
      }

      const data = await res.json();
      if (data.authenticated && data.admin) {
        if (data.session) {
          this.setSession(data.session, data.admin);
        }
        return { authenticated: true, admin: data.admin };
      }
      this.clearSession();
      return { authenticated: false, admin: null };
    } catch (err) {
      // Network error: check stored profile if valid token exists
      const profile = this.getStoredProfile();
      if (token && profile) {
        return { authenticated: true, admin: profile };
      }
      return { authenticated: false, admin: null };
    }
  },

  // SUPER_ADMIN operations
  async listAdministrators(): Promise<AdminPublicProfile[]> {
    const token = this.getToken();
    const res = await fetch('/api/admin/administrators', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch administrators.');
    }
    return data.admins;
  },

  async createAdministrator(params: {
    fullName: string;
    email: string;
    phone?: string;
    role: AdminRole;
    password: string;
  }): Promise<AdminPublicProfile> {
    const token = this.getToken();
    const res = await fetch('/api/admin/administrators', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create administrator account.');
    }
    return data.admin;
  },

  async updateAdminStatus(adminId: string, status: AdminStatus): Promise<void> {
    const token = this.getToken();
    const res = await fetch(`/api/admin/administrators/${encodeURIComponent(adminId)}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update administrator status.');
    }
  },

  async resetAdminPassword(adminId: string, newPassword: string): Promise<void> {
    const token = this.getToken();
    const res = await fetch(`/api/admin/administrators/${encodeURIComponent(adminId)}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to reset password.');
    }
  },

  async deleteAdministrator(adminId: string, reason?: string): Promise<void> {
    const token = this.getToken();
    const res = await fetch(`/api/admin/administrators/${encodeURIComponent(adminId)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ reason }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to delete administrator.');
    }
  },

  async fetchAuditLogs(): Promise<any[]> {
    const token = this.getToken();
    const res = await fetch('/api/admin/audit-logs', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to retrieve audit logs.');
    }
    return data.logs || [];
  },
};
