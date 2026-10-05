/**
 * Firestore Service Layer for Kingdom Rise Company (KRC)
 * Real-time listeners, transactions, and robust offline fallback
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  DBProject,
  DBService,
  DBBlogPost,
  DBContactMessage,
  DBQuoteRequest,
  DBTestimonial,
  DBTeamMember,
  DBMediaItem,
  DBWebsiteSettings,
  DBActivityLog,
  AdminUser,
} from '../types/database';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_BLOG_POSTS,
  COMPANY_PROFILE,
} from '../data/companyData';

// Collection references
export const COLLECTIONS = {
  ADMINS: 'admins',
  PROJECTS: 'projects',
  PROJECT_CATEGORIES: 'project_categories',
  SERVICES: 'services',
  SERVICE_CATEGORIES: 'service_categories',
  BLOG: 'blog_posts',
  BLOG_CATEGORIES: 'blog_categories',
  TESTIMONIALS: 'testimonials',
  TEAM: 'team_members',
  CONTACT_MESSAGES: 'contact_messages',
  QUOTE_REQUESTS: 'quote_requests',
  TENDER_SUBMISSIONS: 'tender_submissions',
  MEDIA: 'media',
  SETTINGS: 'website_settings',
  SOCIAL_LINKS: 'social_links',
  SEO_METADATA: 'seo_metadata',
  ACTIVITY_LOGS: 'activity_logs',
};

// -------------------------------------------------------------
// Auto-seeding initial database state if empty
// -------------------------------------------------------------
export async function seedDatabaseIfEmpty() {
  try {
    const projectsSnap = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    if (projectsSnap.empty) {
      console.log('Seeding initial verified portfolio data into Firestore...');
      const batch = writeBatch(db);

      // Seed Projects
      INITIAL_PROJECTS.forEach((p) => {
        const pRef = doc(db, COLLECTIONS.PROJECTS, p.id);
        const data: DBProject = {
          id: p.id,
          title: p.title,
          slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          client: p.client,
          year: p.year,
          era: p.era,
          sector: p.sector,
          category: p.category,
          location: p.location,
          status: 'Completed',
          description: p.description,
          scope: p.scope || [],
          features: p.scope || [],
          featuredImage: p.image || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg',
          galleryImages: [p.image || '/src/assets/images/projects/kingdom-rise-industrial-facility.jpg'],
          isPublished: true,
          completionDate: `${p.year}-12-31`,
          seoTitle: `${p.title} | Kingdom Rise Projects`,
          seoDescription: p.description.slice(0, 160),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        batch.set(pRef, data);
      });

      // Seed Services
      INITIAL_SERVICES.forEach((s) => {
        const sRef = doc(db, COLLECTIONS.SERVICES, s.id);
        const data: DBService = {
          id: s.id,
          divisionNumber: s.divisionNumber,
          title: s.title,
          slug: s.slug,
          shortDesc: s.shortDesc,
          fullDesc: s.fullDesc,
          capabilities: s.capabilities,
          teamComposition: s.teamComposition,
          keyHighlights: s.keyHighlights,
          image: s.image,
          isPublished: true,
          seoTitle: `${s.title} | Kingdom Rise Services`,
          seoDescription: s.shortDesc,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        batch.set(sRef, data);
      });

      // Seed Blog Posts
      INITIAL_BLOG_POSTS.forEach((b) => {
        const bRef = doc(db, COLLECTIONS.BLOG, b.id);
        const data: DBBlogPost = {
          id: b.id,
          title: b.title,
          slug: b.slug,
          category: b.category,
          date: b.date,
          readTime: b.readTime,
          author: b.author,
          summary: b.summary,
          content: b.content,
          tags: b.tags,
          status: 'Published',
          featuredImage: '/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg',
          seoTitle: `${b.title} | KRC Insights`,
          seoDescription: b.summary,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        batch.set(bRef, data);
      });

      // Seed Website Settings
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
      const settingsData: DBWebsiteSettings = {
        companyName: COMPANY_PROFILE.name,
        arabicName: COMPANY_PROFILE.arabicName,
        tagline: COMPANY_PROFILE.tagline,
        subTagline: COMPANY_PROFILE.subTagline,
        email: COMPANY_PROFILE.email,
        phone: COMPANY_PROFILE.phone,
        address: COMPANY_PROFILE.headquarters,
        businessHours: 'Sun - Thu: 08:00 AM - 05:00 PM (AST)',
        commercialReg: 'Active & Verified (Jeddah)',
        vatNumber: 'ZATCA Registered Tax Entity',
        chamberNumber: 'Jeddah Chamber of Commerce',
        primaryBank: 'SNB - Saudi National Bank',
        secondaryBank: 'Al Rajhi Bank',
        defaultSeoTitle: 'Kingdom Rise Company | Civil, Electrical & Mechanical Construction',
        defaultSeoDescription: COMPANY_PROFILE.summary,
        defaultOgImage: '/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg',
        updatedAt: new Date().toISOString(),
      };
      batch.set(settingsRef, settingsData);

      // Seed Initial Testimonials from verified client engagements
      const testRef1 = doc(db, COLLECTIONS.TESTIMONIALS, 'test-1');
      batch.set(testRef1, {
        id: 'test-1',
        clientName: 'Director of Plant Operations',
        company: 'SWCC (Saline Water Conversion Corp)',
        position: 'Operations & Maintenance',
        testimonialText: 'Kingdom Rise executed the boiler replacement and precision instrumentation loop testing with exemplary engineering discipline and zero reportable safety incidents.',
        displayOrder: 1,
        isPublished: true,
        createdAt: new Date().toISOString(),
      });

      const testRef2 = doc(db, COLLECTIONS.TESTIMONIALS, 'test-2');
      batch.set(testRef2, {
        id: 'test-2',
        clientName: 'Senior Project Manager',
        company: 'Saudi Airlines Cargo Facility',
        position: 'Infrastructure Directorate',
        testimonialText: 'The turnkey delivery of our commercial cargo office building along with integrated Building Management Systems (BMS) was delivered exactly on schedule.',
        displayOrder: 2,
        isPublished: true,
        createdAt: new Date().toISOString(),
      });

      // Seed Initial Categories
      const categories = [
        { id: 'cat-civil', name: 'Civil Infrastructure', slug: 'civil-infrastructure', sector: 'Civil', description: 'Roads, bridges, stormwater, and deep geotechnical foundations', displayOrder: 1, isActive: true },
        { id: 'cat-electrical', name: 'Electrical & Power', slug: 'electrical-power', sector: 'Electrical', description: 'HV/MV substations, transmission networks, and switchgear', displayOrder: 2, isActive: true },
        { id: 'cat-mep', name: 'Mechanical & MEP', slug: 'mechanical-mep', sector: 'Mechanical', description: 'Process piping, HVAC, pumps, BMS, and wastewater treatment', displayOrder: 3, isActive: true },
        { id: 'cat-industrial', name: 'Industrial Maintenance', slug: 'industrial-maintenance', sector: 'Industrial', description: 'Plant turnaround, refractory, shutdown, and heavy machinery AMC', displayOrder: 4, isActive: true },
      ];
      categories.forEach(cat => {
        batch.set(doc(db, COLLECTIONS.PROJECT_CATEGORIES, cat.id), {
          ...cat,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });

      // Seed Social Links
      const socialLinks = [
        { id: 'social-linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/kingdom-rise-co', iconName: 'Linkedin', displayOrder: 1, isActive: true },
        { id: 'social-twitter', platform: 'Twitter', url: 'https://twitter.com/kingdomriseco', iconName: 'Twitter', displayOrder: 2, isActive: true },
        { id: 'social-whatsapp', platform: 'WhatsApp', url: 'https://wa.me/966562997929', iconName: 'Phone', displayOrder: 3, isActive: true },
      ];
      socialLinks.forEach(link => {
        batch.set(doc(db, COLLECTIONS.SOCIAL_LINKS, link.id), {
          ...link,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });

      // Seed SEO Metadata
      const seoPages = [
        { id: 'seo-home', pageKey: 'home', seoTitle: 'Kingdom Rise Company | Premier Civil & Electro-Mechanical Contractor', metaDescription: 'Kingdom Rise Company (KRC) is a 100% Saudi-owned general contracting leader specializing in heavy civil infrastructure, substations, and MEP solutions.' },
        { id: 'seo-projects', pageKey: 'projects', seoTitle: 'Executed Contracts & Portfolio | Kingdom Rise Company', metaDescription: 'Explore verified infrastructure deliveries across SWCC, SEC, Saudi Aramco, and civil mega-developments across the Kingdom of Saudi Arabia.' },
        { id: 'seo-services', pageKey: 'services', seoTitle: 'Engineering Capabilities & Divisions | Kingdom Rise Company', metaDescription: 'Four core operational divisions: Heavy Civil Works, High-Voltage Electrical Substations, Mechanical & Process Piping, and Industrial AMC.' },
        { id: 'seo-about', pageKey: 'about', seoTitle: 'Corporate Governance & Heritage | Kingdom Rise Company', metaDescription: 'Founded with engineering heritage dating back to 2002. Learn about our leadership, ISO safety standards, and Vision 2030 commitments.' },
        { id: 'seo-contact', pageKey: 'contact', seoTitle: 'Contact Engineering Directorate | Kingdom Rise Company', metaDescription: 'Headquartered in Jeddah, Western Province, Kingdom of Saudi Arabia. Reach out for procurement bids and tender inquiries.' },
      ];
      seoPages.forEach(p => {
        batch.set(doc(db, COLLECTIONS.SEO_METADATA, p.id), {
          ...p,
          canonicalUrl: `https://kingdomrise.com/${p.pageKey === 'home' ? '' : p.pageKey}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });

      // Commit Batch
      await batch.commit();
      console.log('Database initial seeding completed successfully.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// -------------------------------------------------------------
// Activity Logging
// -------------------------------------------------------------
export async function logAdminActivity(
  adminEmail: string,
  adminName: string,
  action: DBActivityLog['action'],
  entity: DBActivityLog['entity'],
  description: string,
  entityId?: string,
  metadata?: Record<string, any>
) {
  try {
    const colRef = collection(db, COLLECTIONS.ACTIVITY_LOGS);
    await addDoc(colRef, {
      adminEmail,
      adminName,
      action,
      entity,
      description,
      entityId: entityId || '',
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not record activity log:', err);
  }
}

// -------------------------------------------------------------
// Projects API
// -------------------------------------------------------------
export async function fetchPublishedProjects(): Promise<DBProject[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROJECTS),
      where('isPublished', '==', true),
      orderBy('year', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as DBProject);
  } catch (err) {
    console.warn('Fallback to all projects query:', err);
    const snap = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    return snap.docs.map(d => d.data() as DBProject);
  }
}

export async function createProjectDoc(projectData: Omit<DBProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = `proj-${Date.now()}`;
  const now = new Date().toISOString();
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  const fullProject: DBProject = {
    ...projectData,
    id,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(docRef, fullProject);
  return id;
}

export async function updateProjectDoc(id: string, partial: Partial<DBProject>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteProjectDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Services API
// -------------------------------------------------------------
export async function fetchAllServices(): Promise<DBService[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.SERVICES));
    if (snap.empty) {
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
    }
    return snap.docs.map((d, idx) => {
      const data = d.data() as Partial<DBService> & Record<string, any>;
      const rawNum = data.divisionNumber ?? data.division?.divisionNumber ?? data.division_number;
      const divNum = typeof rawNum === 'string' && rawNum.trim().length > 0
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
        title: data.title || `Division ${divNum}`,
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
    });
  } catch (err) {
    console.warn('fetchAllServices error, falling back to INITIAL_SERVICES:', err);
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
  }
}

export async function updateServiceDoc(id: string, partial: Partial<DBService>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SERVICES, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function createServiceDoc(serviceData: Omit<DBService, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = `service-${Date.now()}`;
  const now = new Date().toISOString();
  const docRef = doc(db, COLLECTIONS.SERVICES, id);
  const fullService: DBService = {
    ...serviceData,
    divisionNumber: serviceData.divisionNumber || '01',
    capabilities: Array.isArray(serviceData.capabilities) ? serviceData.capabilities : [],
    teamComposition: Array.isArray(serviceData.teamComposition) ? serviceData.teamComposition : [],
    keyHighlights: Array.isArray(serviceData.keyHighlights) ? serviceData.keyHighlights : [],
    id,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(docRef, fullService);
  return id;
}

export async function deleteServiceDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SERVICES, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Blog API
// -------------------------------------------------------------
export async function fetchPublishedBlogPosts(): Promise<DBBlogPost[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.BLOG),
      where('status', '==', 'Published'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as DBBlogPost);
  } catch (err) {
    const snap = await getDocs(collection(db, COLLECTIONS.BLOG));
    return snap.docs.map(d => d.data() as DBBlogPost);
  }
}

export async function createBlogPostDoc(data: Omit<DBBlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = `post-${Date.now()}`;
  const now = new Date().toISOString();
  const docRef = doc(db, COLLECTIONS.BLOG, id);
  const fullPost: DBBlogPost = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(docRef, fullPost);
  return id;
}

export async function updateBlogPostDoc(id: string, partial: Partial<DBBlogPost>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOG, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteBlogPostDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOG, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Contact Messages API
// -------------------------------------------------------------
export async function submitContactMessage(
  data: Omit<DBContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const colRef = collection(db, COLLECTIONS.CONTACT_MESSAGES);
  const now = new Date().toISOString();
  const docRef = await addDoc(colRef, {
    ...data,
    status: 'New',
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function updateContactMessageDoc(id: string, partial: Partial<DBContactMessage>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteContactMessageDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Quote Requests API
// -------------------------------------------------------------
export async function submitQuoteRequest(
  data: Omit<DBQuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const colRef = collection(db, COLLECTIONS.QUOTE_REQUESTS);
  const now = new Date().toISOString();
  const docRef = await addDoc(colRef, {
    ...data,
    status: 'New',
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function updateQuoteRequestDoc(id: string, partial: Partial<DBQuoteRequest>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.QUOTE_REQUESTS, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteQuoteRequestDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.QUOTE_REQUESTS, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Tender Submissions API
// -------------------------------------------------------------
export async function submitTenderSubmission(data: any): Promise<string> {
  const colRef = collection(db, COLLECTIONS.TENDER_SUBMISSIONS);
  const now = new Date().toISOString();
  const refCode = `KRC-TND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const docRef = await addDoc(colRef, {
    ...data,
    referenceNumber: refCode,
    status: data.status || 'Submitted',
    emailStatus: data.emailStatus || 'ACCEPTED_BY_PROVIDER',
    createdAt: now,
    updatedAt: now,
  });
  return refCode;
}

export async function updateTenderSubmissionDoc(id: string, partial: any): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TENDER_SUBMISSIONS, id);
  await updateDoc(docRef, {
    ...partial,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteTenderSubmissionDoc(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TENDER_SUBMISSIONS, id);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// Website Settings API
// -------------------------------------------------------------
export async function fetchWebsiteSettings(): Promise<DBWebsiteSettings | null> {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as DBWebsiteSettings;
  }
  return null;
}

export async function updateWebsiteSettings(settings: Partial<DBWebsiteSettings>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
  await setDoc(docRef, {
    ...settings,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

// -------------------------------------------------------------
// Media Library API
// -------------------------------------------------------------
export async function addMediaItem(item: Omit<DBMediaItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.MEDIA);
  const id = `media-${Date.now()}`;
  const fullItem: DBMediaItem = {
    ...item,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setDoc(doc(db, COLLECTIONS.MEDIA, id), fullItem);
  return id;
}

export async function deleteMediaItem(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.MEDIA, id));
}
