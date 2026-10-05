import React from 'react';
import { Button } from './Button';
import {
  AlertCircle,
  WifiOff,
  ServerCrash,
  ShieldAlert,
  Lock,
  UploadCloud,
  MailWarning,
  Database,
  SearchX,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { ErrorCategory } from '../../types/componentStates';

export interface ErrorStateProps {
  category?: ErrorCategory;
  title?: string;
  message?: string;
  onRetry?: () => void | Promise<void>;
  retryLabel?: string;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
  compact?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  category = 'SERVER_ERROR',
  title,
  message,
  onRetry,
  retryLabel = 'Try Again',
  secondaryLabel,
  onSecondaryAction,
  className = '',
  compact = false,
}) => {
  const getCategoryDetails = () => {
    switch (category) {
      case 'NETWORK_ERROR':
        return {
          icon: <WifiOff className="w-8 h-8 text-rose-500" />,
          title: 'Connection Disrupted',
          defaultMessage:
            'Unable to reach Kingdom Rise secure services. Please check your internet connection and try again.',
        };
      case 'DATABASE_ERROR':
        return {
          icon: <Database className="w-8 h-8 text-rose-500" />,
          title: 'Database Synchronization Error',
          defaultMessage:
            'A temporary failure occurred while reading or updating the database. Your request was preserved.',
        };
      case 'EMAIL_ERROR':
        return {
          icon: <MailWarning className="w-8 h-8 text-amber-500" />,
          title: 'Notification Delivery Notice',
          defaultMessage:
            'Your record was safely registered in the database, but confirmation email dispatch encountered a provider timeout.',
        };
      case 'AUTHENTICATION_ERROR':
        return {
          icon: <Lock className="w-8 h-8 text-rose-500" />,
          title: 'Authentication Required',
          defaultMessage:
            'Your administrative session has expired or the credentials provided could not be authenticated.',
        };
      case 'AUTHORIZATION_ERROR':
        return {
          icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
          title: 'Access Denied',
          defaultMessage:
            'You do not possess the required role permissions to perform this operation or view this record.',
        };
      case 'UPLOAD_ERROR':
        return {
          icon: <UploadCloud className="w-8 h-8 text-rose-500" />,
          title: 'Document Upload Failed',
          defaultMessage:
            'The selected document could not be processed. Verify file format (PDF, DOCX, DWG) and size limits.',
        };
      case 'VALIDATION_ERROR':
        return {
          icon: <AlertCircle className="w-8 h-8 text-amber-500" />,
          title: 'Validation Errors Detected',
          defaultMessage:
            'Please review the highlighted fields in the form and rectify invalid entries before resubmitting.',
        };
      case 'RATE_LIMITED':
        return {
          icon: <Clock className="w-8 h-8 text-amber-500" />,
          title: 'Request Limit Reached',
          defaultMessage:
            'Too many requests have been submitted in a short interval. Please wait a moment and try again.',
        };
      case 'NOT_FOUND':
        return {
          icon: <SearchX className="w-8 h-8 text-slate-400" />,
          title: 'Record Not Found',
          defaultMessage:
            'The requested project, service, or article does not exist or may have been unlisted.',
        };
      case 'SERVER_ERROR':
      default:
        return {
          icon: <ServerCrash className="w-8 h-8 text-rose-500" />,
          title: 'System Operational Alert',
          defaultMessage:
            'An unexpected error occurred while processing this request. Our technical team has been notified.',
        };
    }
  };

  const details = getCategoryDetails();
  const displayTitle = title || details.title;
  const displayMessage = message || details.defaultMessage;

  if (compact) {
    return (
      <div
        className={`p-3.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/30 flex items-center justify-between gap-3 text-xs ${className}`}
      >
        <div className="flex items-center gap-2.5 text-rose-800 dark:text-rose-200 min-w-0">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="truncate">{displayMessage}</span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 px-2.5 py-1 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-xs flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{retryLabel}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={`
        flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-2xl
        border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20
        ${className}
      `}
    >
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 flex items-center justify-center mb-4 shadow-2xs">
        {details.icon}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
        {displayTitle}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-md leading-relaxed">
        {displayMessage}
      </p>

      {(onRetry || (secondaryLabel && onSecondaryAction)) && (
        <div className="flex items-center gap-3 mt-6">
          {secondaryLabel && onSecondaryAction && (
            <Button variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryLabel}
            </Button>
          )}
          {onRetry && (
            <Button
              variant="danger"
              size="sm"
              onClick={onRetry}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              {retryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
