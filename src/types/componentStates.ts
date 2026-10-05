/**
 * Kingdom Rise Limited - Component State and Interaction System Types
 * Specifications for UI, Form, Auth, CMS, and Async States
 */

// 1. General Interactive States
export type InteractiveState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'active'
  | 'loading'
  | 'disabled'
  | 'success'
  | 'error'
  | 'empty'
  | 'selected';

// 2. Button Variants & Sizes
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'icon';

export type ButtonSize = 'sm' | 'md' | 'lg';

// 3. Form State Machine
export type FormStatus =
  | 'IDLE'
  | 'EDITING'
  | 'VALIDATING'
  | 'SUBMITTING'
  | 'SUCCESS'
  | 'ERROR'
  | 'RETRYING';

// 4. Email & Notification Delivery States
export type EmailDeliveryStatus =
  | 'QUEUED'
  | 'SENDING'
  | 'ACCEPTED_BY_PROVIDER'
  | 'DELIVERED'
  | 'FAILED'
  | 'RETRYING';

// 5. File Upload Component States
export type FileUploadStatus =
  | 'EMPTY'
  | 'SELECTED'
  | 'VALIDATING'
  | 'UPLOADING'
  | 'UPLOADED'
  | 'FAILED'
  | 'REMOVING'
  | 'REMOVED';

export interface UploadedFileReference {
  name: string;
  size: number;
  type: string;
  url?: string;
  storagePath?: string;
  uploadedAt: string;
}

// 6. Tender Submission States
export type TenderStatus =
  | 'DRAFT'
  | 'EDITING'
  | 'VALIDATING'
  | 'UPLOADING'
  | 'SUBMITTING'
  | 'SUBMITTED'
  | 'EMAIL_PENDING'
  | 'EMAIL_SENT'
  | 'EMAIL_FAILED'
  | 'ERROR';

export interface DBTenderSubmission {
  id: string;
  referenceNumber: string; // e.g., KRC-TND-2026-XXXX
  companyName: string;
  crNumber: string;
  representativeName: string;
  representativeEmail: string;
  representativePhone: string;
  tenderTitle: string;
  tenderReference?: string;
  sector: string;
  proposedValue?: string;
  documents: {
    fileName: string;
    fileSize: number;
    fileType: string;
    url?: string;
  }[];
  notes?: string;
  status: 'Submitted' | 'Under Review' | 'Prequalified' | 'Archived';
  emailStatus: EmailDeliveryStatus;
  createdAt: string;
  updatedAt: string;
}

// 7. Admin CMS Lifecycle States
export type CMSActionState =
  | 'CREATE'
  | 'EDIT'
  | 'DIRTY'
  | 'SAVING'
  | 'SAVED'
  | 'PUBLISHING'
  | 'PUBLISHED'
  | 'UNPUBLISHING'
  | 'UNPUBLISHED'
  | 'VALIDATION_ERROR'
  | 'SAVE_ERROR';

// 8. Delete & Archive Lifecycle States
export type ArchiveState =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'DELETING'
  | 'DELETED'
  | 'RESTORING'
  | 'RESTORED'
  | 'ERROR';

// 9. Error System Categorization
export type ErrorCategory =
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'UPLOAD_ERROR'
  | 'EMAIL_ERROR'
  | 'DATABASE_ERROR'
  | 'NOT_FOUND'
  | 'RATE_LIMITED';

export interface AppError {
  category: ErrorCategory;
  message: string;
  field?: string;
  details?: string;
  retryAction?: () => void | Promise<void>;
  timestamp: string;
}

// 10. Toast Notification
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
