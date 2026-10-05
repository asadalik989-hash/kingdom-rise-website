/**
 * Backend Database Models & Schemas
 * Kingdom Rise Company (KRC)
 * Phase 1: Comprehensive Relational Architecture
 */

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

// 1. Admins & Users
export interface AdminUser {
  id: string; // Firebase Auth UID
  email: string;
  displayName: string;
  role: UserRole;
  status: 'active' | 'suspended';
  avatarUrl?: string;
  phoneNumber?: string;
  department?: string;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt: string;
}

// 2. Project Categories
export interface DBProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  sector: 'Civil' | 'Electrical' | 'Mechanical' | 'Oil & Gas' | 'Water & Power' | 'Aviation' | 'Industrial';
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 3. Projects
export type ProjectStatus = 'Planning' | 'Ongoing' | 'Completed' | 'Archived';

export interface DBProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  era: '2002-2008' | '2009-2015' | '2016-2020' | '2021-2023+';
  sector: 'Civil' | 'Electrical' | 'Mechanical' | 'Oil & Gas' | 'Water & Power' | 'Aviation' | 'Industrial';
  categoryId?: string;
  category: string;
  location: string;
  status: ProjectStatus;
  description: string;
  scope: string[];
  features?: string[];
  featuredImage?: string;
  galleryImages?: string[];
  isPublished: boolean;
  completionDate?: string;
  estimatedValue?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
}

// 4. Service Categories
export interface DBServiceCategory {
  id: string;
  divisionNumber: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 5. Services
export interface DBService {
  id: string;
  divisionNumber: string;
  categoryId?: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: { title: string; desc: string }[];
  teamComposition: string[];
  keyHighlights: string[];
  image: string;
  isPublished: boolean;
  relatedProjectIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// 6. Blog Categories
export interface DBBlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 7. Blog Posts
export type BlogStatus = 'Draft' | 'Published' | 'Scheduled' | 'Archived';

export interface DBBlogPost {
  id: string;
  title: string;
  slug: string;
  categoryId?: string;
  category: string;
  date: string;
  readTime: string;
  authorId?: string;
  author: string;
  summary: string;
  content: string[];
  tags: string[];
  status: BlogStatus;
  scheduledAt?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
}

// 8. Testimonials
export interface DBTestimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  testimonialText: string;
  profileImage?: string;
  projectId?: string;
  rating?: number;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// 9. Team Members
export interface DBTeamMember {
  id: string;
  name: string;
  position: string;
  department?: string;
  biography: string;
  profileImage?: string;
  linkedinUrl?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// 10. Contact Messages
export type ContactMessageStatus = 'New' | 'Read' | 'In Progress' | 'Resolved' | 'Archived';

export interface DBContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  internalNotes?: string;
  assignedAdminId?: string;
  createdAt: string;
  updatedAt: string;
}

// 11. Request a Quote (Tender Requests)
export type QuoteStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost' | 'Closed';

export interface DBQuoteRequest {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget: string;
  timeline: string;
  scopeDescription: string;
  attachmentName?: string;
  attachmentUrl?: string;
  status: QuoteStatus;
  internalNotes?: string;
  assignedAdminId?: string;
  assignedAdmin?: string;
  createdAt: string;
  updatedAt: string;
}

// 12. Media / Files
export interface DBMediaItem {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  storagePath?: string;
  altText: string;
  category?: 'projects' | 'services' | 'blog' | 'documents' | 'general';
  uploadedById?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 13. Website Settings
export interface DBWebsiteSettings {
  companyName: string;
  arabicName: string;
  tagline: string;
  subTagline: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  commercialReg: string;
  vatNumber: string;
  chamberNumber: string;
  primaryBank: string;
  secondaryBank: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string;
  colorScheme?: string;
  customColors?: { primary: string; accent: string; background?: string };
  updatedAt: string;
}

// 14. Social Links
export interface DBSocialLink {
  id: string;
  platform: 'LinkedIn' | 'Twitter' | 'YouTube' | 'Instagram' | 'Facebook' | 'WhatsApp';
  url: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 15. SEO Metadata
export interface DBSeoMetadata {
  id: string; // e.g., 'home', 'about', 'services', 'projects', 'blog', 'contact'
  pageKey: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  createdAt: string;
  updatedAt: string;
}

// 16. Activity Logs
export interface DBActivityLog {
  id: string;
  adminId?: string;
  adminEmail: string;
  adminName: string;
  action:
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'PUBLISH'
    | 'UNPUBLISH'
    | 'STATUS_CHANGE'
    | 'LOGIN'
    | 'LOGOUT'
    | 'SETTINGS_CHANGE';
  entity:
    | 'project'
    | 'service'
    | 'blog'
    | 'quote'
    | 'message'
    | 'testimonial'
    | 'team'
    | 'media'
    | 'settings'
    | 'auth'
    | 'category'
    | 'seo';
  entityId?: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}
