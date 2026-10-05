import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  DBProject,
  DBService,
  DBBlogPost,
  DBQuoteRequest,
  DBContactMessage,
  DBTestimonial,
  DBTeamMember,
  DBMediaItem,
  DBWebsiteSettings,
  DBActivityLog,
  AdminUser,
} from '../types/database';
import {
  seedDatabaseIfEmpty,
  createProjectDoc,
  updateProjectDoc,
  deleteProjectDoc,
  createServiceDoc,
  updateServiceDoc,
  deleteServiceDoc,
  createBlogPostDoc,
  updateBlogPostDoc,
  deleteBlogPostDoc,
  submitQuoteRequest,
  updateQuoteRequestDoc,
  deleteQuoteRequestDoc,
  submitContactMessage,
  updateContactMessageDoc,
  deleteContactMessageDoc,
  updateWebsiteSettings,
  addMediaItem,
  deleteMediaItem,
  submitTenderSubmission,
  updateTenderSubmissionDoc,
  deleteTenderSubmissionDoc,
  logAdminActivity,
  COLLECTIONS,
} from '../services/dbService';
import { DBTenderSubmission } from '../types/componentStates';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_BLOG_POSTS,
  COMPANY_PROFILE,
} from '../data/companyData';
import { COLOR_SCHEMES, ColorSchemeConfig } from '../types/theme';
import { translations, Translations } from '../translations/translations';
import { useAuth } from './AuthContext';

interface AppContextType {
  // Navigation
  activePage: string;
  navigateTo: (page: string, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;

  // Language
  lang: 'EN' | 'AR';
  setLang: (lang: 'EN' | 'AR') => void;
  t: Translations;

  // Selected for modals
  selectedProject: DBProject | null;
  setSelectedProject: (proj: DBProject | null) => void;
  selectedBlogPost: DBBlogPost | null;
  setSelectedBlogPost: (post: DBBlogPost | null) => void;

  // Real-time Database Collections
  projects: DBProject[];
  services: DBService[];
  blogPosts: DBBlogPost[];
  quotes: DBQuoteRequest[];
  messages: DBContactMessage[];
  testimonials: DBTestimonial[];
  teamMembers: DBTeamMember[];
  mediaItems: DBMediaItem[];
  activityLogs: DBActivityLog[];
  adminsList: AdminUser[];
  websiteSettings: DBWebsiteSettings | null;

  isDbLoading: boolean;

  // Operations
  addProject: (proj: Omit<DBProject, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateProject: (id: string, proj: Partial<DBProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addService: (serv: Omit<DBService, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateService: (id: string, serv: Partial<DBService>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  addBlogPost: (post: Omit<DBBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateBlogPost: (id: string, post: Partial<DBBlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  addQuote: (data: Omit<DBQuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateQuoteStatus: (id: string, status: DBQuoteRequest['status'], notes?: string) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;

  // Tenders
  tenders: DBTenderSubmission[];
  addTender: (data: any) => Promise<string>;
  updateTenderStatus: (id: string, status: any, notes?: string) => Promise<void>;
  deleteTender: (id: string) => Promise<void>;
  isTenderModalOpen: boolean;
  setIsTenderModalOpen: (open: boolean) => void;
  openTenderModal: (sector?: string) => void;
  tenderPrefillSector: string;

  addMessage: (data: Omit<DBContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateMessageStatus: (id: string, status: DBContactMessage['status'], notes?: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  saveSettings: (settings: Partial<DBWebsiteSettings>) => Promise<void>;
  uploadMedia: (item: Omit<DBMediaItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  removeMedia: (id: string) => Promise<void>;

  // Color Schemes & Dynamic Themes
  colorScheme: string;
  setColorScheme: (schemeId: string) => void;
  activeSchemeConfig: ColorSchemeConfig;
  allColorSchemes: ColorSchemeConfig[];

  // Legacy fallback compatibility
  isAdminLoggedIn?: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Navigation
  const [activePage, setActivePage] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'home';
  });
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  // Language
  const [lang, setLangState] = useState<'EN' | 'AR'>(() => {
    try {
      const saved = localStorage.getItem('krc_lang');
      if (saved === 'AR' || saved === 'EN') return saved;
    } catch {
      // ignore
    }
    return 'EN';
  });

  const setLang = (newLang: 'EN' | 'AR') => {
    setLangState(newLang);
    try {
      localStorage.setItem('krc_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'AR' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  // Modals
  const [selectedProject, setSelectedProject] = useState<DBProject | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<DBBlogPost | null>(null);

  // Live Database State
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [services, setServices] = useState<DBService[]>(() => {
    return INITIAL_SERVICES.map(s => ({
      ...s,
      divisionNumber: s.divisionNumber || '01',
      capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
      teamComposition: Array.isArray(s.teamComposition) ? s.teamComposition : [],
      keyHighlights: Array.isArray(s.keyHighlights) ? s.keyHighlights : [],
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  });
  const [blogPosts, setBlogPosts] = useState<DBBlogPost[]>([]);
  const [quotes, setQuotes] = useState<DBQuoteRequest[]>([]);
  const [tenders, setTenders] = useState<DBTenderSubmission[]>([]);
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);
  const [tenderPrefillSector, setTenderPrefillSector] = useState('');
  const [messages, setMessages] = useState<DBContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<DBTestimonial[]>([]);
  const [teamMembers, setTeamMembers] = useState<DBTeamMember[]>([]);
  const [mediaItems, setMediaItems] = useState<DBMediaItem[]>([]);
  const [activityLogs, setActivityLogs] = useState<DBActivityLog[]>([]);
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);
  const [websiteSettings, setWebsiteSettings] = useState<DBWebsiteSettings | null>(null);
  const [isDbLoading, setIsDbLoading] = useState(true);

  // Initialize and Seed Firestore
  useEffect(() => {
    async function init() {
      await seedDatabaseIfEmpty();
    }
    init();
  }, []);

  // Real-time snapshot listeners
  useEffect(() => {
    // 1. Projects Listener
    const unsubProjects = onSnapshot(collection(db, COLLECTIONS.PROJECTS), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as DBProject);
        // sort by year descending
        list.sort((a, b) => b.year.localeCompare(a.year));
        setProjects(list);
      } else {
        // Fallback to initial if still seeding
        setProjects(INITIAL_PROJECTS.map(p => ({
          ...p,
          slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: 'Completed',
          features: p.scope,
          featuredImage: p.image || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg',
          galleryImages: [p.image || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg'],
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })));
      }
      setIsDbLoading(false);
    }, (error) => {
      console.warn('Projects snapshot error, using local fallback:', error);
      setIsDbLoading(false);
    });

    // 2. Services Listener
    const unsubServices = onSnapshot(
      collection(db, COLLECTIONS.SERVICES),
      (snap) => {
        if (!snap.empty) {
          const list: DBService[] = snap.docs
            .map((d, idx) => {
              const data = d.data() as Partial<DBService> & Record<string, any>;
              if (!data) return null;

              const rawNum =
                data.divisionNumber ??
                data.division?.divisionNumber ??
                data.division_number;
              
              let divNum = typeof rawNum === 'string' && rawNum.trim().length > 0
                ? rawNum.trim()
                : typeof rawNum === 'number'
                ? String(rawNum).padStart(2, '0')
                : (d.id === 'civil-engineering' ? '01'
                   : d.id === 'electrical-engineering' ? '02'
                   : d.id === 'mechanical-engineering' ? '03'
                   : d.id === 'specialized-services' ? '04'
                   : String(idx + 1).padStart(2, '0'));

              return {
                id: d.id,
                divisionNumber: divNum,
                categoryId: data.categoryId || '',
                title: data.title || (divNum === '01' ? 'Civil Engineering Services' : `Division ${divNum}`),
                slug: data.slug || d.id,
                shortDesc: data.shortDesc || '',
                fullDesc: data.fullDesc || data.shortDesc || '',
                capabilities: Array.isArray(data.capabilities) ? data.capabilities : [],
                teamComposition: Array.isArray(data.teamComposition) ? data.teamComposition : [],
                keyHighlights: Array.isArray(data.keyHighlights) ? data.keyHighlights : [],
                image: data.image || '/src/assets/images/services/kingdom-rise-civil-engineering.jpg',
                isPublished: data.isPublished !== false,
                seoTitle: data.seoTitle || '',
                seoDescription: data.seoDescription || '',
                createdAt: data.createdAt || new Date().toISOString(),
                updatedAt: data.updatedAt || new Date().toISOString(),
              } as DBService;
            })
            .filter((s): s is DBService => s !== null);

          list.sort((a, b) => (a.divisionNumber || '').localeCompare(b.divisionNumber || ''));
          setServices(list.length > 0 ? list : INITIAL_SERVICES.map(s => ({
            ...s,
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })));
        } else {
          setServices(INITIAL_SERVICES.map(s => ({
            ...s,
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })));
        }
      },
      (error) => {
        console.warn('Services snapshot error, using local fallback:', error);
        setServices(INITIAL_SERVICES.map(s => ({
          ...s,
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })));
      }
    );

    // 3. Blog Posts Listener
    const unsubBlog = onSnapshot(collection(db, COLLECTIONS.BLOG), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as DBBlogPost);
        setBlogPosts(list);
      } else {
        setBlogPosts(INITIAL_BLOG_POSTS.map(b => ({
          ...b,
          status: 'Published',
          featuredImage: '/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })));
      }
    });

    // 6. Testimonials
    const unsubTestimonials = onSnapshot(collection(db, COLLECTIONS.TESTIMONIALS), (snap) => {
      setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() } as DBTestimonial)));
    });

    // 7. Team Members
    const unsubTeam = onSnapshot(collection(db, COLLECTIONS.TEAM), (snap) => {
      setTeamMembers(snap.docs.map(d => ({ id: d.id, ...d.data() } as DBTeamMember)));
    });

    // 8. Media
    const unsubMedia = onSnapshot(collection(db, COLLECTIONS.MEDIA), (snap) => {
      setMediaItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as DBMediaItem)));
    });

    // 9. Website Settings
    const unsubSettings = onSnapshot(collection(db, COLLECTIONS.SETTINGS), (snap) => {
      const general = snap.docs.find(d => d.id === 'general');
      if (general) {
        setWebsiteSettings(general.data() as DBWebsiteSettings);
      }
    });

    return () => {
      unsubProjects();
      unsubServices();
      unsubBlog();
      unsubTestimonials();
      unsubTeam();
      unsubMedia();
      unsubSettings();
    };
  }, []);

  // Dedicated Admin Data Sync (Only executes when admin is verified and authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      setQuotes([]);
      setTenders([]);
      setMessages([]);
      setActivityLogs([]);
      return;
    }

    let isMounted = true;

    async function loadAdminData() {
      try {
        const [qRes, tRes, mRes, lRes] = await Promise.all([
          fetch('/api/admin/quotes').then(r => r.ok ? r.json() : { quotes: [] }).catch(() => ({ quotes: [] })),
          fetch('/api/admin/tenders').then(r => r.ok ? r.json() : { tenders: [] }).catch(() => ({ tenders: [] })),
          fetch('/api/admin/messages').then(r => r.ok ? r.json() : { messages: [] }).catch(() => ({ messages: [] })),
          fetch('/api/admin/audit-logs').then(r => r.ok ? r.json() : { logs: [] }).catch(() => ({ logs: [] })),
        ]);

        if (isMounted) {
          if (Array.isArray(qRes.quotes)) setQuotes(qRes.quotes);
          if (Array.isArray(tRes.tenders)) setTenders(tRes.tenders);
          if (Array.isArray(mRes.messages)) setMessages(mRes.messages);
          if (Array.isArray(lRes.logs)) setActivityLogs(lRes.logs);
        }
      } catch (err) {
        // Safe silent fallback
      }
    }

    loadAdminData();
    const interval = setInterval(loadAdminData, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Hash Navigation Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash && hash !== activePage) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage]);

  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Operation Handlers
  const addProject = async (proj: Omit<DBProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = await createProjectDoc(proj);
    return id;
  };

  const updateProject = async (id: string, proj: Partial<DBProject>) => {
    await updateProjectDoc(id, proj);
  };

  const deleteProject = async (id: string) => {
    await deleteProjectDoc(id);
  };

  const addService = async (serv: Omit<DBService, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await createServiceDoc(serv);
  };

  const updateService = async (id: string, serv: Partial<DBService>) => {
    await updateServiceDoc(id, serv);
  };

  const deleteService = async (id: string) => {
    await deleteServiceDoc(id);
  };

  const addBlogPost = async (post: Omit<DBBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await createBlogPostDoc(post);
  };

  const updateBlogPost = async (id: string, post: Partial<DBBlogPost>) => {
    await updateBlogPostDoc(id, post);
  };

  const deleteBlogPost = async (id: string) => {
    await deleteBlogPostDoc(id);
  };

  const addQuote = async (data: Omit<DBQuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    return await submitQuoteRequest(data);
  };

  const updateQuoteStatus = async (id: string, status: DBQuoteRequest['status'], notes?: string) => {
    try {
      await fetch(`/api/admin/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...(notes ? { internalNotes: notes } : {}) }),
      });
    } catch {
      await updateQuoteRequestDoc(id, {
        status,
        ...(notes ? { internalNotes: notes } : {}),
      });
    }
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status, ...(notes ? { internalNotes: notes } : {}) } : q))
    );
  };

  const deleteQuote = async (id: string) => {
    try {
      await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' });
    } catch {
      await deleteQuoteRequestDoc(id);
    }
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const addTender = async (data: any) => {
    return await submitTenderSubmission(data);
  };

  const updateTenderStatus = async (id: string, status: any, notes?: string) => {
    try {
      await fetch(`/api/admin/tenders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...(notes ? { notes } : {}) }),
      });
    } catch {
      await updateTenderSubmissionDoc(id, {
        status,
        ...(notes ? { notes } : {}),
      });
    }
    setTenders((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, ...(notes ? { notes } : {}) } : t))
    );
  };

  const deleteTender = async (id: string) => {
    try {
      await fetch(`/api/admin/tenders/${id}`, { method: 'DELETE' });
    } catch {
      await deleteTenderSubmissionDoc(id);
    }
    setTenders((prev) => prev.filter((t) => t.id !== id));
  };

  const openTenderModal = (sector?: string) => {
    if (sector) setTenderPrefillSector(sector);
    setIsTenderModalOpen(true);
  };

  const addMessage = async (data: Omit<DBContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    return await submitContactMessage(data);
  };

  const updateMessageStatus = async (id: string, status: DBContactMessage['status'], notes?: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...(notes ? { internalNotes: notes } : {}) }),
      });
    } catch {
      await updateContactMessageDoc(id, {
        status,
        ...(notes ? { internalNotes: notes } : {}),
      });
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status, ...(notes ? { internalNotes: notes } : {}) } : m))
    );
  };

  const deleteMessage = async (id: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    } catch {
      await deleteContactMessageDoc(id);
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const saveSettings = async (settings: Partial<DBWebsiteSettings>) => {
    await updateWebsiteSettings(settings);
  };

  const uploadMedia = async (item: Omit<DBMediaItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await addMediaItem(item);
  };

  const removeMedia = async (id: string) => {
    await deleteMediaItem(id);
  };

  // Color Scheme Management (Refined Previous Scheme 'amber-gold' by default)
  const [colorScheme, setColorSchemeState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('krc_color_scheme');
      if (saved && COLOR_SCHEMES.some(s => s.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    // Default to the previous color combination ('amber-gold') as requested
    return 'amber-gold';
  });

  const activeSchemeConfig = COLOR_SCHEMES.find(s => s.id === colorScheme) || COLOR_SCHEMES[0];

  // Synchronize colorScheme with database websiteSettings when loaded/updated
  useEffect(() => {
    if (websiteSettings?.colorScheme && COLOR_SCHEMES.some(s => s.id === websiteSettings.colorScheme)) {
      setColorSchemeState(websiteSettings.colorScheme);
      try {
        localStorage.setItem('krc_color_scheme', websiteSettings.colorScheme);
      } catch {
        // ignore
      }
    }
  }, [websiteSettings?.colorScheme]);

  const setColorScheme = (schemeId: string) => {
    setColorSchemeState(schemeId);
    try {
      localStorage.setItem('krc_color_scheme', schemeId);
    } catch {
      // ignore
    }
    // Persist to database so the admin's selected theme applies globally to the entire website
    updateWebsiteSettings({ colorScheme: schemeId }).catch((err) => {
      console.warn('Could not sync color scheme to remote settings:', err);
    });
  };

  useEffect(() => {
    // Apply data-color-scheme to document element
    document.documentElement.setAttribute('data-color-scheme', colorScheme);

    // Also apply direct CSS variable values to guarantee instant reactive styling
    const scheme = COLOR_SCHEMES.find(s => s.id === colorScheme) || COLOR_SCHEMES[0];
    const root = document.documentElement;
    root.style.setProperty('--color-brand-blue', scheme.primary);
    root.style.setProperty('--color-brand-blue-hover', scheme.primaryHover);
    root.style.setProperty('--color-brand-blue-dark', scheme.primaryDark);
    root.style.setProperty('--color-brand-blue-light', scheme.primaryLight);
    root.style.setProperty('--color-brand-teal', scheme.accent);
    root.style.setProperty('--color-brand-teal-hover', scheme.accentHover);
    root.style.setProperty('--color-brand-teal-dark', scheme.accentDark);
    root.style.setProperty('--color-brand-teal-light', scheme.accentLight);
    root.style.setProperty('--color-brand-bg', scheme.canvas);
    root.style.setProperty('--color-brand-text', scheme.text);
    root.style.setProperty('--color-brand-muted', scheme.muted);
    root.style.setProperty('--color-brand-border', scheme.border);
    root.style.setProperty('--color-brand-surface', scheme.surface);
  }, [colorScheme]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        navigateTo,
        pageParams,
        lang,
        setLang,
        t: translations[lang],
        selectedProject,
        setSelectedProject,
        selectedBlogPost,
        setSelectedBlogPost,
        projects,
        services,
        blogPosts,
        quotes,
        messages,
        testimonials,
        teamMembers,
        mediaItems,
        activityLogs,
        adminsList,
        websiteSettings,
        isDbLoading,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addQuote,
        updateQuoteStatus,
        deleteQuote,
        tenders,
        addTender,
        updateTenderStatus,
        deleteTender,
        isTenderModalOpen,
        setIsTenderModalOpen,
        openTenderModal,
        tenderPrefillSector,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        saveSettings,
        uploadMedia,
        removeMedia,
        colorScheme,
        setColorScheme,
        activeSchemeConfig,
        allColorSchemes: COLOR_SCHEMES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
