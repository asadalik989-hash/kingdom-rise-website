import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSITIONS } from '../components/motion/MotionConfig';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  DBProject,
  DBService,
  DBBlogPost,
  ProjectStatus,
  QuoteStatus,
  ContactMessageStatus,
} from '../types/database';
import { AdminPublicProfile, AdminRole, AdminStatus } from '../types/adminAuth';
import { KRCLogo } from '../components/KRCLogo';
import {
  Shield,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Clock,
  Activity,
  FolderKanban,
  Layers,
  FileQuestion,
  Mail,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Users,
  RefreshCw,
  Save,
  X,
  Copy,
  Check,
  FileCheck2,
  Paperclip,
  Download,
  Palette,
} from 'lucide-react';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../components/ui/Toast';

export const AdminDashboard: React.FC = () => {
  const {
    activePage,
    navigateTo,
    projects,
    addProject,
    updateProject,
    deleteProject,
    services,
    updateService,
    addService,
    deleteService,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    quotes,
    updateQuoteStatus,
    deleteQuote,
    tenders,
    updateTenderStatus,
    deleteTender,
    messages,
    updateMessageStatus,
    deleteMessage,
    mediaItems,
    uploadMedia,
    removeMedia,
    websiteSettings,
    saveSettings,
    colorScheme,
    setColorScheme,
    allColorSchemes,
    activeSchemeConfig,
  } = useApp();

  const { showSuccess, showError } = useToast();

  // Destructive Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm Delete',
    onConfirm: async () => {},
    isLoading: false,
  });

  const requestConfirmation = (
    title: string,
    message: string,
    action: () => Promise<void>,
    confirmLabel: string = 'Confirm Delete'
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      confirmLabel,
      isLoading: false,
      onConfirm: async () => {
        setConfirmDialog((p) => ({ ...p, isLoading: true }));
        try {
          await action();
          showSuccess('Operation Completed', `${title} executed successfully.`);
          setConfirmDialog((p) => ({ ...p, isOpen: false, isLoading: false }));
        } catch (err: any) {
          showError('Operation Failed', err?.message || 'Action could not be executed.');
          setConfirmDialog((p) => ({ ...p, isLoading: false }));
        }
      },
    });
  };

  const {
    adminProfile,
    role,
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    isEditor,
    isLoading: isAuthLoading,
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
  } = useAuth();

  // Tab state derived from URL subroute
  type AdminTab =
    | 'overview'
    | 'projects'
    | 'services'
    | 'blog'
    | 'quotes'
    | 'tenders'
    | 'messages'
    | 'media'
    | 'theme'
    | 'settings'
    | 'administrators'
    | 'logs';

  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    if (activePage.startsWith('admin/')) {
      const sub = activePage.replace('admin/', '') as AdminTab;
      if (['overview', 'projects', 'services', 'blog', 'quotes', 'tenders', 'messages', 'media', 'theme', 'settings', 'administrators', 'logs'].includes(sub)) {
        return sub;
      }
    }
    return 'overview';
  });

  // Sync tab with URL
  useEffect(() => {
    if (activePage.startsWith('admin/')) {
      const sub = activePage.replace('admin/', '') as AdminTab;
      if (sub !== activeTab && ['overview', 'projects', 'services', 'blog', 'quotes', 'tenders', 'messages', 'media', 'theme', 'settings', 'administrators', 'logs'].includes(sub)) {
        setActiveTab(sub);
      }
    }
  }, [activePage]);

  const switchTab = (tab: AdminTab) => {
    setActiveTab(tab);
    navigateTo(`admin/${tab}`);
  };

  // Login Form States
  const [loginAdminId, setLoginAdminId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Project Modal States
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<DBProject> | null>(null);

  // Service Modal States
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Partial<DBService> | null>(null);

  // Blog Modal States
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Partial<DBBlogPost> | null>(null);

  // Media upload simulation
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  // Quote notes modal
  const [selectedQuoteForNotes, setSelectedQuoteForNotes] = useState<string | null>(null);
  const [quoteNotesInput, setQuoteNotesInput] = useState('');

  // Administrator Management States
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('ADMIN');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [createAdminSubmitting, setCreateAdminSubmitting] = useState(false);
  const [adminActionFeedback, setAdminActionFeedback] = useState<string | null>(null);

  // Reset Password Modal
  const [resetModalAdminId, setResetModalAdminId] = useState<string | null>(null);
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);

  // Super Admin Administrator Deletion Modal
  const [deleteModalAdmin, setDeleteModalAdmin] = useState<AdminPublicProfile | null>(null);
  const [deleteReasonInput, setDeleteReasonInput] = useState('');
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Load super admin data on tab change
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'administrators' && isSuperAdmin) {
        loadAdministrators();
      }
      if (activeTab === 'logs' || activeTab === 'overview') {
        loadAuditLogs();
      }
    }
  }, [activeTab, isAuthenticated, isSuperAdmin, loadAdministrators, loadAuditLogs]);

  // Handle Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAdminId.trim() || !loginPassword) return;

    setLoginSubmitting(true);
    setAuthError(null);

    try {
      await login(loginAdminId.trim(), loginPassword);
      setLoginAdminId('');
      setLoginPassword('');
      navigateTo('admin/dashboard');
    } catch (err: any) {
      // Handled in context
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle Create Administrator Submission
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword) return;

    setCreateAdminSubmitting(true);
    setAdminActionFeedback(null);

    try {
      const created = await createAdministrator({
        fullName: newAdminName.trim(),
        email: newAdminEmail.trim(),
        phone: newAdminPhone.trim() || undefined,
        role: newAdminRole,
        password: newAdminPassword,
      });

      setAdminActionFeedback(`Successfully authorized ${created.adminId} for ${created.fullName}.`);
      setShowCreateAdminModal(false);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPhone('');
      setNewAdminPassword('');
      setNewAdminRole('ADMIN');
    } catch (err: any) {
      setAdminActionFeedback(`Error: ${err.message}`);
    } finally {
      setCreateAdminSubmitting(false);
    }
  };

  // Handle Reset Password Submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAdminId || !resetPasswordInput) return;

    setResetSubmitting(true);
    try {
      await resetAdminPassword(resetModalAdminId, resetPasswordInput);
      setAdminActionFeedback(`Password successfully reset for administrator ${resetModalAdminId}.`);
      setResetModalAdminId(null);
      setResetPasswordInput('');
    } catch (err: any) {
      setAdminActionFeedback(`Error resetting password: ${err.message}`);
    } finally {
      setResetSubmitting(false);
    }
  };

  // Handle Super Admin Administrator Deletion
  const handleDeleteAdministrator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteModalAdmin) return;

    if (deleteConfirmInput.trim().toUpperCase() !== deleteModalAdmin.adminId.toUpperCase()) {
      setDeleteError(`Please type ${deleteModalAdmin.adminId} exactly to confirm permanent deletion.`);
      return;
    }

    setDeleteSubmitting(true);
    setDeleteError(null);

    try {
      await deleteAdministrator(deleteModalAdmin.adminId, deleteReasonInput.trim());
      showSuccess(
        'Administrator Deleted',
        `Administrator ${deleteModalAdmin.adminId} (${deleteModalAdmin.fullName}) has been permanently deleted from Firebase Authentication and Firestore.`
      );
      setAdminActionFeedback(
        `Administrator ${deleteModalAdmin.adminId} (${deleteModalAdmin.fullName}) was successfully deleted.`
      );
      setDeleteModalAdmin(null);
      setDeleteReasonInput('');
      setDeleteConfirmInput('');
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to delete administrator.';
      setDeleteError(errorMsg);
      showError('Deletion Failed', errorMsg);
    } finally {
      setDeleteSubmitting(false);
    }
  };

  // Handle Theme Deployment (Admin Exclusive)
  const handleDeployTheme = (schemeId: string) => {
    if (!isAdmin) {
      showError('Permission Denied', 'Only authenticated system administrators can configure the website color theme.');
      return;
    }
    setColorScheme(schemeId);
    const targetScheme = allColorSchemes.find((s) => s.id === schemeId);
    showSuccess(
      'Global Theme Deployed',
      `"${targetScheme?.name || schemeId}" is now the active color scheme across the entire public website.`
    );
  };

  // -------------------------------------------------------------
  // 1. UNAUTHENTICATED STATE: ZERO-TRUST ADMIN ID LOGIN SCREEN
  // -------------------------------------------------------------
  if (isAuthLoading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <KRCLogo iconOnly size="lg" className="w-12 h-12 animate-pulse text-[#00C7AE]" />
          <span className="text-xs font-mono text-slate-400">Verifying administrator authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 flex items-center justify-center mx-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-inner p-2">
              <KRCLogo iconOnly size="lg" className="w-10 h-10" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00C7AE]/10 border border-[#00C7AE]/30 text-[#00C7AE] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Shield className="w-3 h-3 text-[#00C7AE]" />
                <span>Restricted Access Portal</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Kingdom Rise Limited
              </h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Authorized Administrator Identification Gateway
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Secure Admin ID Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Administrator ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. KR-ADMIN-001"
                  value={loginAdminId}
                  onChange={(e) => setLoginAdminId(e.target.value.toUpperCase())}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors uppercase tracking-wider"
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-500 hover:text-slate-300 absolute right-2.5 top-2.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3 px-4 bg-[#0052CC] hover:bg-[#0041A3] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {loginSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Enter</span>
                </>
              )}
            </button>
          </form>

          {/* Access Policy Notice */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Shield className="w-3.5 h-3.5 text-[#00C7AE]" />
              <span>Strict Access Rule Enforcement</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              Public registration and self-signup are permanently disabled. Accounts can only be provisioned by the system owner. Failed login attempts are rate-limited and logged.
            </p>
            <div className="pt-1.5 border-t border-slate-800 font-mono text-[10px] text-slate-300">
              <strong className="text-[#00C7AE]">Initial Super Admin:</strong> KR-ADMIN-001 | Password: <span className="underline text-white">KingdomRise#2026!Admin</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Return to Kingdom Rise Public Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED STATE: FULL ADMIN SUITE
  // -------------------------------------------------------------
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* TOP BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-slate-950 rounded-lg border border-slate-800 p-1">
            <KRCLogo iconOnly size="sm" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                Kingdom Rise Limited
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-[#00C7AE] border border-[#00C7AE]/30 font-bold uppercase">
                {adminProfile?.adminId}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                  isSuperAdmin
                    ? 'bg-[#0052CC] text-white'
                    : isAdmin
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {role}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Authenticated Administrator: <strong className="text-slate-200">{adminProfile?.fullName}</strong> ({adminProfile?.email})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin-Only Theme Shortcut Indicator */}
          <button
            onClick={() => switchTab('theme')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-700 bg-slate-900/80 hover:border-amber-500/60 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Admin-only Website Color Theme Selector"
          >
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: activeSchemeConfig?.primary || '#D97706' }} />
              <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20 -ml-1" style={{ backgroundColor: activeSchemeConfig?.accent || '#F59E0B' }} />
            </div>
            <span className="text-[11px] font-bold text-amber-400 truncate max-w-[130px]">{activeSchemeConfig?.name || 'Theme'}</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00C7AE]" />
          </button>

          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 rounded-lg transition-colors cursor-pointer"
            title="Terminate session and log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ADMIN TABS NAVIGATION */}
      <nav className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-8 sticky top-14 z-20 overflow-x-auto">
        <div className="flex items-center gap-1.5 py-2">
          {[
            { id: 'overview', label: 'Overview', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'projects', label: `Projects (${projects.length})`, icon: <FolderKanban className="w-3.5 h-3.5" /> },
            { id: 'services', label: `Services (${services.length})`, icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'quotes', label: `Quotes (${quotes.length})`, icon: <FileQuestion className="w-3.5 h-3.5" /> },
            { id: 'tenders', label: `Tenders (${tenders.length})`, icon: <FileCheck2 className="w-3.5 h-3.5 text-[#00C7AE]" /> },
            { id: 'messages', label: `Inquiries (${messages.length})`, icon: <Mail className="w-3.5 h-3.5" /> },
            { id: 'blog', label: `Blog (${blogPosts.length})`, icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'media', label: `Media (${mediaItems.length})`, icon: <ImageIcon className="w-3.5 h-3.5" /> },
            { id: 'theme', label: 'Color Themes', icon: <Palette className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
            // Administrators Tab (SUPER_ADMIN)
            ...(isSuperAdmin
              ? [
                  {
                    id: 'administrators',
                    label: `Administrators (${administrators.length || '•'})`,
                    icon: <Users className="w-3.5 h-3.5 text-[#00C7AE]" />,
                    highlight: true,
                  },
                ]
              : []),
            { id: 'logs', label: 'Security & Audit', icon: <Clock className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0052CC] text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: TRANSITIONS.snappyEase }}
            className="space-y-8"
          >
            {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Corporate Infrastructure & Operations Console
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active session: <span className="font-mono text-[#00C7AE]">{adminProfile?.adminId}</span> · Role: <span className="font-bold text-white">{adminProfile?.role}</span>
                </p>
              </div>

              {isSuperAdmin && (
                <button
                  onClick={() => switchTab('administrators')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-[#00C7AE]" />
                  <span>Manage Administrators</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Projects in Database</span>
                <span className="text-3xl font-bold font-mono text-white block tabular-nums">{projects.length}</span>
                <span className="text-[11px] text-emerald-400">
                  {projects.filter(p => p.isPublished).length} Active Public Contracts
                </span>
              </div>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Engineering Divisions</span>
                <span className="text-3xl font-bold font-mono text-[#00C7AE] block tabular-nums">{services.length}</span>
                <span className="text-[11px] text-slate-400">Civil, Electrical, MEP, AMC</span>
              </div>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Tender Quote Requests</span>
                <span className="text-3xl font-bold font-mono text-white block tabular-nums">{quotes.length}</span>
                <span className="text-[11px] text-[#00C7AE]">
                  {quotes.filter(q => q.status === 'New').length} Pending Review
                </span>
              </div>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Contact Inquiries</span>
                <span className="text-3xl font-bold font-mono text-white block tabular-nums">{messages.length}</span>
                <span className="text-[11px] text-emerald-400">
                  {messages.filter(m => m.status === 'New').length} Unread
                </span>
              </div>
            </div>

            {/* Split: Recent Quotes and Security Audit Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quotes */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <FileQuestion className="w-4 h-4 text-[#00C7AE]" />
                    <span>Recent Inbound Tender Requests</span>
                  </h3>
                  <button
                    onClick={() => switchTab('quotes')}
                    className="text-xs text-[#00C7AE] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.slice(0, 4).map((q) => (
                    <div key={q.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{q.fullName} ({q.companyName})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0052CC]/20 text-[#00C7AE] font-mono border border-[#00C7AE]/30">
                          {q.status}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px] block">
                        {q.projectType} · <span className="text-[#00C7AE]">{q.projectLocation}</span> · {q.estimatedBudget}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Logs Preview */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Recent Security Audit Events</span>
                  </h3>
                  <button
                    onClick={() => switchTab('logs')}
                    className="text-xs text-[#00C7AE] hover:underline font-semibold cursor-pointer"
                  >
                    View All Logs
                  </button>
                </div>

                <div className="space-y-3">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{log.description || log.action}</span>
                        <span className="font-mono text-[10px] text-[#00C7AE]">{log.action}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono block">
                        Admin: {log.adminEmail || log.metadata?.adminId || 'System'} · {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ADMINISTRATORS (SUPER_ADMIN ONLY) */}
        {activeTab === 'administrators' && (
          <div className="space-y-6">
            {!isSuperAdmin ? (
              <div className="p-8 bg-slate-900 rounded-xl border border-rose-800/60 text-center space-y-3">
                <Shield className="w-10 h-10 text-rose-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Privileged Section Restricted</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Only administrators with the <strong className="text-[#00C7AE]">SUPER_ADMIN</strong> role have permissions to create, suspend, or manage administrator identities.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#00C7AE]" />
                      <span>Administrator Identity & Access Management</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manually provision and manage authorized administrator accounts. Each admin is assigned an immutable, unique Admin ID. Public signup is disabled.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowCreateAdminModal(true);
                      setAdminActionFeedback(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Administrator</span>
                  </button>
                </div>

                {/* Feedback Alert */}
                {adminActionFeedback && (
                  <div className="p-3.5 bg-slate-900 border border-[#00C7AE]/40 rounded-xl text-[#00C7AE] text-xs flex items-center justify-between">
                    <span>{adminActionFeedback}</span>
                    <button
                      onClick={() => setAdminActionFeedback(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Administrators Table */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-5 py-3.5">Admin ID</th>
                          <th className="px-5 py-3.5">Full Name & Contact</th>
                          <th className="px-5 py-3.5">Role</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="px-5 py-3.5">Created Date</th>
                          <th className="px-5 py-3.5">Last Login</th>
                          <th className="px-5 py-3.5 text-right">Access Controls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {administrators.map((admin) => (
                          <tr key={admin.adminId} className="hover:bg-slate-950/50 transition-colors">
                            {/* Admin ID */}
                            <td className="px-5 py-3.5">
                              <span className="font-mono font-bold text-[#00C7AE] bg-[#00C7AE]/10 px-2.5 py-1 rounded border border-[#00C7AE]/30">
                                {admin.adminId}
                              </span>
                            </td>

                            {/* Name & Contact */}
                            <td className="px-5 py-3.5">
                              <span className="font-bold text-white block">{admin.fullName}</span>
                              <span className="text-[11px] text-slate-400 font-mono">{admin.email}</span>
                              {admin.phone && (
                                <span className="text-[10px] text-slate-500 block">{admin.phone}</span>
                              )}
                            </td>

                            {/* Role */}
                            <td className="px-5 py-3.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                  admin.role === 'SUPER_ADMIN'
                                    ? 'bg-[#0052CC] text-white'
                                    : admin.role === 'ADMIN'
                                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {admin.role}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  admin.status === 'ACTIVE'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : admin.status === 'SUSPENDED'
                                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                                }`}
                              >
                                {admin.status === 'ACTIVE' ? (
                                  <UserCheck className="w-3 h-3" />
                                ) : (
                                  <UserX className="w-3 h-3" />
                                )}
                                <span>{admin.status}</span>
                              </span>
                            </td>

                            {/* Created */}
                            <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                              {admin.createdAt?.slice(0, 10)}
                              <span className="block text-[10px] text-slate-500">By {admin.createdBy}</span>
                            </td>

                            {/* Last Login */}
                            <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                              {admin.lastLogin ? admin.lastLogin.slice(0, 16).replace('T', ' ') : 'Never'}
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                              {/* Status Toggle */}
                              {admin.status === 'ACTIVE' ? (
                                <>
                                  <button
                                    onClick={() => updateAdminStatus(admin.adminId, 'SUSPENDED')}
                                    disabled={admin.adminId === adminProfile?.adminId}
                                    className="px-2 py-1 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 text-amber-300 rounded text-[10px] font-bold uppercase disabled:opacity-30"
                                    title="Temporarily suspend access"
                                  >
                                    Suspend
                                  </button>
                                  <button
                                    onClick={() => updateAdminStatus(admin.adminId, 'DISABLED')}
                                    disabled={admin.adminId === adminProfile?.adminId}
                                    className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded text-[10px] font-bold uppercase disabled:opacity-30"
                                    title="Disable account"
                                  >
                                    Disable
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => updateAdminStatus(admin.adminId, 'ACTIVE')}
                                  className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded text-[10px] font-bold uppercase"
                                  title="Re-activate account"
                                >
                                  Activate
                                </button>
                              )}

                              {/* Reset Password */}
                              <button
                                onClick={() => {
                                  setResetModalAdminId(admin.adminId);
                                  setResetPasswordInput('');
                                }}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold uppercase border border-slate-700"
                                title="Reset Administrator Password"
                              >
                                Reset Pass
                              </button>

                              {/* Super Admin Delete Button */}
                              {isSuperAdmin && (
                                <button
                                  onClick={() => {
                                    setDeleteModalAdmin(admin);
                                    setDeleteReasonInput('');
                                    setDeleteConfirmInput('');
                                    setDeleteError(null);
                                  }}
                                  disabled={
                                    admin.adminId === adminProfile?.adminId ||
                                    (admin.role === 'SUPER_ADMIN' &&
                                      administrators.filter(
                                        (a) => a.role === 'SUPER_ADMIN' && a.status === 'ACTIVE'
                                      ).length <= 1)
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                                  title={
                                    admin.adminId === adminProfile?.adminId
                                      ? 'Cannot delete your own active Super Admin account'
                                      : admin.role === 'SUPER_ADMIN' &&
                                        administrators.filter(
                                          (a) => a.role === 'SUPER_ADMIN' && a.status === 'ACTIVE'
                                        ).length <= 1
                                      ? 'Cannot delete the final active Super Admin account'
                                      : `Permanently delete administrator ${admin.adminId}`
                                  }
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Delete</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Projects Catalog ({projects.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Manage engineering and infrastructure contract records. Changes sync in real-time.
                </p>
              </div>

              {isEditor && (
                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      client: '',
                      year: '2026',
                      era: '2021-2023+',
                      sector: 'Civil',
                      category: 'Civil Infrastructure',
                      location: 'Jeddah, Saudi Arabia',
                      status: 'Completed',
                      description: '',
                      scope: ['Excavation and foundation works', 'Reinforced concrete structures'],
                      featuredImage: '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg',
                      isPublished: true,
                    });
                    setShowProjectModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              )}
            </div>

            <div className="relative max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Title</th>
                      <th className="px-5 py-3.5">Client & Sector</th>
                      <th className="px-5 py-3.5">Location</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Visibility</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {projects
                      .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.client.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-950/50">
                          <td className="px-5 py-3.5 font-bold text-white">{p.title}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-white block">{p.client}</span>
                            <span className="text-[#00C7AE] text-[11px]">{p.sector}</span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-400">{p.location}</td>
                          <td className="px-5 py-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <button
                              onClick={() => updateProject(p.id, { isPublished: !p.isPublished })}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold ${
                                p.isPublished
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {p.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                            </button>
                          </td>
                          <td className="px-5 py-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingProject(p);
                                setShowProjectModal(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-white"
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {isAdmin && (
                              <button
                                onClick={() => {
                                  requestConfirmation(
                                    'Delete Project Record',
                                    `Permanently remove project "${p.title}" from the verified database?`,
                                    () => deleteProject(p.id)
                                  );
                                }}
                                className="p-1.5 text-slate-500 hover:text-rose-400"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Engineering Services & Divisions ({services.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((serv) => (
                <div key={serv.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#00C7AE]">
                        DIVISION {serv?.divisionNumber || '01'}
                      </span>
                      <h3 className="text-base font-bold text-white">{serv?.title || 'Division'}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setEditingService(serv);
                        setShowServiceModal(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">{serv.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Tender Quotation Requests ({quotes.length})
            </h2>

            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-sm font-bold text-white block">{q.fullName} ({q.companyName})</span>
                      <span className="text-xs text-slate-400 font-mono">
                        {q.email} · {q.phone} · Location: {q.projectLocation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={q.status}
                        onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteStatus)}
                        className="bg-slate-950 text-[#00C7AE] border border-slate-700 text-xs px-2.5 py-1 rounded"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Qualified">Status: Qualified</option>
                        <option value="Proposal Sent">Status: Proposal Sent</option>
                        <option value="Won">Status: Won</option>
                        <option value="Lost">Status: Lost</option>
                        <option value="Closed">Status: Closed</option>
                      </select>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            requestConfirmation(
                              'Delete Quotation Request',
                              `Permanently delete quotation request from ${q.fullName} (${q.companyName})?`,
                              () => deleteQuote(q.id)
                            );
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                          title="Delete Quote"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
                    {q.scopeDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TENDERS */}
        {activeTab === 'tenders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#00C7AE]" />
                  <span>Tender & Prequalification Submissions ({tenders.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Official vendor dossiers, CR registrations, and technical tender proposals submitted through public and portal channels.
                </p>
              </div>
            </div>

            {tenders.length === 0 ? (
              <div className="p-10 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2 text-slate-400">
                <FileCheck2 className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-white">No Tender Submissions Received Yet</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tender proposals submitted from the public site and client portal will be indexed here in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tenders.map((t) => (
                  <div key={t.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#00C7AE] bg-[#00C7AE]/10 px-2 py-0.5 rounded border border-[#00C7AE]/20">
                            {t.referenceNumber || 'KRC-TND-2026'}
                          </span>
                          <span className="text-sm font-bold text-white">{t.companyName}</span>
                          <span className="text-xs text-slate-400 font-mono">CR: {t.crNumber}</span>
                        </div>
                        <span className="text-xs text-slate-400 mt-1 block">
                          Representative: <strong>{t.representativeName}</strong> ({t.representativeEmail} · {t.representativePhone})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={t.status || 'Submitted'}
                          onChange={(e) => updateTenderStatus(t.id, e.target.value)}
                          className="bg-slate-950 text-[#00C7AE] border border-slate-700 text-xs px-2.5 py-1 rounded font-semibold cursor-pointer"
                        >
                          <option value="Submitted">Status: Submitted</option>
                          <option value="Under Review">Status: Under Review</option>
                          <option value="Prequalified">Status: Prequalified</option>
                          <option value="Archived">Status: Archived</option>
                        </select>

                        {isAdmin && (
                          <button
                            onClick={() => {
                              requestConfirmation(
                                'Delete Tender Submission',
                                `Permanently delete tender proposal from ${t.companyName}?`,
                                () => deleteTender(t.id)
                              );
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                            title="Delete Tender"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Sector</span>
                        <strong className="text-slate-200">{t.sector}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Proposed Package Value</span>
                        <strong className="text-slate-200">{t.proposedValue || 'TBD'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Email Dispatch</span>
                        <span className="text-emerald-400 font-medium">{t.emailStatus || 'ACCEPTED_BY_PROVIDER'}</span>
                      </div>
                    </div>

                    {t.notes && (
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        <strong>Scope Notes:</strong> {t.notes}
                      </p>
                    )}

                    {t.documents && t.documents.length > 0 && (
                      <div className="pt-2 flex items-center gap-2 flex-wrap">
                        {t.documents.map((doc, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono"
                          >
                            <Paperclip className="w-3.5 h-3.5 text-[#00C7AE]" />
                            <span>{doc.fileName}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: INQUIRIES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Public Contact Inquiries ({messages.length})
            </h2>

            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                    <div>
                      <strong className="text-white">{m.name}</strong> · <span className="text-[#00C7AE]">[{m.subject}]</span>
                      <span className="text-slate-500 block font-mono">{m.email} · {m.phone}</span>
                    </div>
                    <button
                      onClick={() => {
                        requestConfirmation(
                          'Delete Contact Message',
                          `Permanently delete message from ${m.name}?`,
                          () => deleteMessage(m.id)
                        );
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded">{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Technical Insights & Articles ({blogPosts.length})
              </h2>
              {isEditor && (
                <button
                  onClick={() => {
                    setEditingBlog({
                      title: '',
                      category: 'Infrastructure',
                      summary: '',
                      content: [''],
                      tags: ['Vision 2030', 'Saudi Construction'],
                      status: 'Published',
                    });
                    setShowBlogModal(true);
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded uppercase transition-colors cursor-pointer"
                >
                  + Create Article
                </button>
              )}
            </div>

            <div className="space-y-3">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00C7AE] block">{post.category}</span>
                    <strong className="text-sm text-white">{post.title}</strong>
                    <span className="text-xs text-slate-400 block">{post.summary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingBlog(post);
                        setShowBlogModal(true);
                      }}
                      className="p-2 text-slate-400 hover:text-white cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          requestConfirmation(
                            'Delete Blog Article',
                            `Permanently delete article "${post.title}"?`,
                            () => deleteBlogPost(post.id)
                          );
                        }}
                        className="p-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MEDIA */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Media Asset Registry ({mediaItems.length})
            </h2>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#00C7AE] block">Catalog New Asset</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Asset Title"
                  value={newMediaTitle}
                  onChange={(e) => setNewMediaTitle(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
                <input
                  type="text"
                  placeholder="URL / Asset Path"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>
              <button
                onClick={async () => {
                  if (!newMediaTitle || !newMediaUrl) return;
                  await uploadMedia({
                    fileName: newMediaTitle,
                    fileType: 'image/jpeg',
                    fileSize: 1024000,
                    url: newMediaUrl,
                    altText: newMediaTitle,
                    uploadedBy: adminProfile?.adminId || 'Admin',
                  });
                  setNewMediaTitle('');
                  setNewMediaUrl('');
                }}
                className="px-4 py-2 bg-[#0052CC] hover:bg-[#0041A3] text-white font-bold uppercase rounded transition-colors cursor-pointer"
              >
                Register Asset
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden text-xs">
                  <div className="aspect-video bg-slate-950">
                    <img src={item.url} alt={item.altText} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="font-bold text-white block truncate">{item.fileName}</span>
                    <button
                      onClick={() => {
                        requestConfirmation(
                          'Remove Media Asset',
                          `Delete media asset "${item.fileName}" from the library?`,
                          () => removeMedia(item.id)
                        );
                      }}
                      className="text-rose-400 hover:underline text-[10px] mt-1 block cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: COLOR THEMES (ADMIN EXCLUSIVE) */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            {/* Executive Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      Brand Color Schemes & Theme System
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Shield className="w-3 h-3 text-amber-400" />
                      <span>Admin Exclusive</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Configure the official visual theme for Kingdom Rise Limited. Themes are accessible and modifiable only by administrators and apply globally to all public visitors.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                  <span className="text-[11px] text-slate-400">Deployed Scheme:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: activeSchemeConfig.primary }} />
                    <span className="w-3 h-3 rounded-full border border-white/20 -ml-1" style={{ backgroundColor: activeSchemeConfig.accent }} />
                    <span className="text-xs font-bold text-amber-400">{activeSchemeConfig.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Policy & Live Real-Time Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between text-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#00C7AE] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-white block">Strict Administrator Theme Governance</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Theme switching controls have been removed from the public website and are restricted to this console. When you deploy a theme below, the configuration is synced to cloud database settings and dynamically propagated across the public site for all client visitors in real time.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Current Administrator: <strong className="text-white">{adminProfile?.fullName || 'System Admin'}</strong></span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${isAdmin ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                    {isAdmin ? '✓ Authorized to Deploy' : 'Read-only Access'}
                  </span>
                </div>
              </div>

              {/* Live Reactive Token Simulation */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between text-xs space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">Live UI Component Preview</span>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Call-to-Action</span>
                      <button
                        type="button"
                        className="px-3 py-1 rounded text-[11px] font-bold text-white shadow-xs cursor-default"
                        style={{ backgroundColor: activeSchemeConfig.primary }}
                      >
                        Request Quote
                      </button>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Accent Highlight</span>
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{ color: activeSchemeConfig.accent, backgroundColor: `${activeSchemeConfig.accent}15` }}
                      >
                        Saudi Vision 2030
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Primary: {activeSchemeConfig.primary}</span>
                  <span>Accent: {activeSchemeConfig.accent}</span>
                </div>
              </div>
            </div>

            {/* Available Refined Theme Palettes Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Available Brand Palettes ({allColorSchemes.length})
                </h3>
                <span className="text-[11px] text-slate-400">Click any palette card to preview and deploy</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allColorSchemes.map((scheme) => {
                  const isCurrent = colorScheme === scheme.id;
                  return (
                    <div
                      key={scheme.id}
                      onClick={() => handleDeployTheme(scheme.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isCurrent
                          ? 'border-amber-500 bg-slate-950 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                          : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        {/* Top Bar with Swatches and Badge */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span
                                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: scheme.primary }}
                                title={`Primary: ${scheme.primary}`}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-white/20 shadow-sm -ml-2"
                                style={{ backgroundColor: scheme.accent }}
                                title={`Accent: ${scheme.accent}`}
                              />
                            </div>
                            <div className="text-xs font-mono text-slate-400 ml-1">
                              {scheme.primary} / {scheme.accent}
                            </div>
                          </div>

                          {scheme.badge && (
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                                scheme.isPreviousScheme
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {scheme.badge}
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="font-bold text-white text-sm flex items-center justify-between">
                          <span>{scheme.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-amber-400 font-mono font-bold flex items-center gap-1">
                              <Check className="w-3 h-3 text-amber-400" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#00C7AE] font-medium mt-0.5">{scheme.subtitle}</div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal">
                          {scheme.description}
                        </p>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-slate-500">
                          ID: {scheme.id}
                        </span>
                        <button
                          type="button"
                          disabled={!isAdmin && !isCurrent}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeployTheme(scheme.id);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                              : isAdmin
                              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                              : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {isCurrent ? '✓ Active Theme' : isAdmin ? 'Deploy Globally' : 'Admin Only'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Website & Corporate Metadata
            </h2>

            {websiteSettings && (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      defaultValue={websiteSettings.companyName}
                      onBlur={(e) => saveSettings({ companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={websiteSettings.email}
                      onBlur={(e) => saveSettings({ email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Brand Design & Color Scheme Architecture */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeSchemeConfig.primary }} />
                    <span>Brand Design System & Color Palette (Admin Only)</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Select the active website color combination. Only administrators can deploy themes globally.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                    Active: {activeSchemeConfig.name}
                  </span>
                  <button
                    onClick={() => switchTab('theme')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Open Theme Studio →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {allColorSchemes.map((scheme) => {
                  const isCurrent = colorScheme === scheme.id;
                  return (
                    <div
                      key={scheme.id}
                      onClick={() => handleDeployTheme(scheme.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isCurrent
                          ? 'border-amber-500 bg-slate-950 shadow-md shadow-amber-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shadow-xs"
                            style={{ backgroundColor: scheme.primary }}
                            title={`Primary: ${scheme.primary}`}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shadow-xs -ml-2"
                            style={{ backgroundColor: scheme.accent }}
                            title={`Accent: ${scheme.accent}`}
                          />
                        </div>
                        {scheme.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              scheme.isPreviousScheme
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {scheme.badge}
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-white text-xs">{scheme.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{scheme.subtitle}</div>
                      <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-relaxed font-normal">
                        {scheme.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="font-mono text-slate-400">
                          {scheme.primary} / {scheme.accent}
                        </span>
                        <button
                          type="button"
                          disabled={!isAdmin && !isCurrent}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeployTheme(scheme.id);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950'
                              : isAdmin
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {isCurrent ? 'Current Default' : isAdmin ? 'Activate' : 'Admin Only'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00C7AE]" />
              <span>Immutable Security & Operations Audit Trail ({auditLogs.length})</span>
            </h2>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-5 py-3">Admin ID</th>
                      <th className="px-5 py-3">Security Action</th>
                      <th className="px-5 py-3">Details / Audit Metadata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-[11px] text-slate-300">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-950/40">
                        <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-5 py-3 text-[#00C7AE] font-bold whitespace-nowrap">
                          {log.adminEmail || log.metadata?.adminId || 'SYSTEM'}
                        </td>
                        <td className="px-5 py-3 text-white font-bold whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="px-5 py-3 text-slate-400">
                          {log.description || JSON.stringify(log.metadata)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: CREATE ADMINISTRATOR (SUPER_ADMIN ONLY) */}
      {/* ------------------------------------------------------------- */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00C7AE]" />
                <h3 className="text-base font-bold">Authorize New Administrator</h3>
              </div>
              <button
                onClick={() => setShowCreateAdminModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4 text-xs">
              <div className="p-3 bg-[#0052CC]/15 border border-[#0052CC]/30 rounded-xl text-[#00C7AE]">
                <span className="font-bold block">Next Sequential Admin ID will be assigned:</span>
                <span className="font-mono text-sm font-bold text-white block mt-0.5">
                  KR-ADMIN-{String(administrators.length + 1).padStart(3, '0')}
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal / Corporate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Al-Ghamdi"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@kingdomrise.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={newAdminPhone}
                    onChange={(e) => setNewAdminPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Privileges</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                >
                  <option value="ADMIN">ADMIN (Full Content, Projects, Services, Quotes, Inquiries)</option>
                  <option value="EDITOR">EDITOR (Draft and Publish Content & Media Only)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full System & Administrator Management)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Initial Password (min 8 characters)</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Create secure initial password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateAdminModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAdminSubmitting}
                  className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0041A3] disabled:opacity-50 text-white font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {createAdminSubmitting ? 'Provisioning...' : 'Provision Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: RESET PASSWORD MODAL */}
      {/* ------------------------------------------------------------- */}
      {resetModalAdminId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold">Reset Password for {resetModalAdminId}</h3>
              <button
                onClick={() => setResetModalAdminId(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Enter new 8+ char password"
                  value={resetPasswordInput}
                  onChange={(e) => setResetPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalAdminId(null)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="px-4 py-2 bg-[#0052CC] hover:bg-[#0041A3] disabled:opacity-50 text-white font-bold rounded-lg uppercase transition-colors cursor-pointer"
                >
                  {resetSubmitting ? 'Updating...' : 'Set Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: SUPER ADMIN PERMANENT ADMINISTRATOR DELETION MODAL */}
      {/* ------------------------------------------------------------- */}
      {deleteModalAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-rose-900/60 rounded-2xl p-6 space-y-4 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Permanently Delete Administrator</h3>
                  <p className="text-xs text-rose-400 font-medium">Critical Security Action • Permanent Revocation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!deleteSubmitting) {
                    setDeleteModalAdmin(null);
                    setDeleteError(null);
                  }
                }}
                disabled={deleteSubmitting}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Account Summary Card */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Target Account</span>
                <span className="font-mono text-xs font-bold text-[#00C7AE] bg-[#00C7AE]/10 px-2 py-0.5 rounded border border-[#00C7AE]/30">
                  {deleteModalAdmin.adminId}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Full Name:</span>
                  <span className="font-bold text-white">{deleteModalAdmin.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email Address:</span>
                  <span className="font-mono text-slate-200">{deleteModalAdmin.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Role Privilege:</span>
                  <span className="font-mono font-bold uppercase text-sky-400">{deleteModalAdmin.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-bold uppercase text-slate-300">{deleteModalAdmin.status}</span>
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-200/90 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Irreversible Permanent Deletion</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Deleting this account will permanently revoke all administrative credentials from Firebase Authentication and remove the administrator record from Firestore. Active sessions will terminate immediately.
              </p>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200 flex items-start gap-2">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{deleteError}</span>
              </div>
            )}

            <form onSubmit={handleDeleteAdministrator} className="space-y-3.5 text-xs">
              {/* Optional Reason for Audit Log */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Reason for Deletion <span className="text-slate-500 font-normal">(Recorded in security audit logs)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Employee departure, security restructuring..."
                  value={deleteReasonInput}
                  onChange={(e) => setDeleteReasonInput(e.target.value)}
                  disabled={deleteSubmitting}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Explicit Confirmation Input */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Type <span className="font-mono text-[#00C7AE] font-bold">{deleteModalAdmin.adminId}</span> to confirm:
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Type ${deleteModalAdmin.adminId} here`}
                  value={deleteConfirmInput}
                  onChange={(e) => {
                    setDeleteConfirmInput(e.target.value);
                    if (deleteError) setDeleteError(null);
                  }}
                  disabled={deleteSubmitting}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-rose-500 uppercase"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModalAdmin(null);
                    setDeleteError(null);
                  }}
                  disabled={deleteSubmitting}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    deleteSubmitting ||
                    deleteConfirmInput.trim().toUpperCase() !== deleteModalAdmin.adminId.toUpperCase()
                  }
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-950 disabled:text-rose-600 text-white font-bold rounded-lg uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{deleteSubmitting ? 'Deleting...' : 'Permanently Delete'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: PROJECT EDIT / CREATE MODAL */}
      {/* ------------------------------------------------------------- */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-white my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold">
                {editingProject.id ? 'Edit Contract' : 'Create Infrastructure Contract'}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!editingProject.title || !editingProject.client) return;
                if (editingProject.id) {
                  await updateProject(editingProject.id, editingProject);
                } else {
                  await addProject({
                    title: editingProject.title,
                    slug: editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    client: editingProject.client,
                    year: editingProject.year || '2026',
                    era: (editingProject.era as any) || '2021-2023+',
                    sector: (editingProject.sector as any) || 'Civil',
                    category: editingProject.category || 'Civil Infrastructure',
                    location: editingProject.location || 'Jeddah, Saudi Arabia',
                    status: (editingProject.status as any) || 'Ongoing',
                    description: editingProject.description || '',
                    scope: editingProject.scope || ['Engineering execution'],
                    features: editingProject.features || [],
                    featuredImage: editingProject.featuredImage || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg',
                    galleryImages: [editingProject.featuredImage || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg'],
                    isPublished: editingProject.isPublished !== undefined ? editingProject.isPublished : true,
                    completionDate: editingProject.completionDate || '2026-12-31',
                  });
                }
                setShowProjectModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contract Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Authority</label>
                  <input
                    type="text"
                    required
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sector</label>
                  <select
                    value={editingProject.sector || 'Civil'}
                    onChange={(e) => setEditingProject({ ...editingProject, sector: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Water & Power">Water & Power</option>
                    <option value="Aviation">Aviation</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={editingProject.status || 'Ongoing'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Planning">Planning</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg uppercase"
                >
                  Save Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: BLOG EDIT / CREATE MODAL */}
      {/* ------------------------------------------------------------- */}
      {showBlogModal && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold">{editingBlog.id ? 'Edit Article' : 'Draft Article'}</h3>
              <button onClick={() => setShowBlogModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!editingBlog.title || !editingBlog.summary) return;
                if (editingBlog.id) {
                  await updateBlogPost(editingBlog.id, editingBlog);
                } else {
                  await addBlogPost({
                    title: editingBlog.title,
                    slug: editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    category: editingBlog.category || 'Infrastructure',
                    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    readTime: '5 min read',
                    author: adminProfile?.fullName || 'KRC Technical Directorate',
                    summary: editingBlog.summary,
                    content: editingBlog.content || [editingBlog.summary],
                    tags: ['Vision 2030', 'Saudi Construction'],
                    status: 'Published',
                  });
                }
                setShowBlogModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Summary</label>
                <textarea
                  rows={3}
                  required
                  value={editingBlog.summary || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg uppercase"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: SERVICE EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold">Edit Division {editingService?.divisionNumber || '01'}</h3>
              <button onClick={() => setShowServiceModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (editingService.id) {
                  await updateService(editingService.id, editingService);
                }
                setShowServiceModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Division Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingService.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg uppercase"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destructive Action Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((p) => ({ ...p, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        isLoading={confirmDialog.isLoading}
      />

    </div>
  );
};
