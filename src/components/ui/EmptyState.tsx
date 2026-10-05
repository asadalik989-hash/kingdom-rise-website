import React from 'react';
import { Button } from './Button';
import {
  FolderOpen,
  Search,
  FileQuestion,
  Inbox,
  Image as ImageIcon,
  Bell,
  HardHat,
  Newspaper,
  Briefcase,
} from 'lucide-react';

export interface EmptyStateProps {
  type?:
    | 'projects'
    | 'services'
    | 'blog'
    | 'search'
    | 'leads'
    | 'quotes'
    | 'tenders'
    | 'notifications'
    | 'media'
    | 'generic';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'generic',
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  icon,
  className = '',
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'projects':
        return {
          icon: <HardHat className="w-10 h-10 text-slate-400" />,
          title: 'No Projects Found',
          description:
            'There are currently no projects matching this category or filter criteria in the verified database.',
        };
      case 'services':
        return {
          icon: <Briefcase className="w-10 h-10 text-slate-400" />,
          title: 'No Services Available',
          description:
            'Services are being updated. Check back shortly or contact our engineering advisory team directly.',
        };
      case 'blog':
        return {
          icon: <Newspaper className="w-10 h-10 text-slate-400" />,
          title: 'No Technical Articles Found',
          description:
            'No published articles matched your selected filter or query. New publications are released periodically.',
        };
      case 'search':
        return {
          icon: <Search className="w-10 h-10 text-slate-400" />,
          title: 'No Results Found',
          description:
            'We couldn’t find any matches for your query. Try broadening your keywords or resetting filters.',
        };
      case 'leads':
        return {
          icon: <Inbox className="w-10 h-10 text-slate-400" />,
          title: 'No Inbound Inquiries Yet',
          description:
            'All client contact messages have been reviewed, or no new messages have been received.',
        };
      case 'quotes':
        return {
          icon: <FileQuestion className="w-10 h-10 text-slate-400" />,
          title: 'No Tender / Quote Requests',
          description:
            'There are currently no active quote submissions in this status pipeline.',
        };
      case 'tenders':
        return {
          icon: <FolderOpen className="w-10 h-10 text-slate-400" />,
          title: 'No Tender Applications',
          description:
            'No tender prequalification or proposal dossiers have been submitted in this view.',
        };
      case 'notifications':
        return {
          icon: <Bell className="w-10 h-10 text-slate-400" />,
          title: 'All Caught Up',
          description: 'You have no unread administrative notifications at this time.',
        };
      case 'media':
        return {
          icon: <ImageIcon className="w-10 h-10 text-slate-400" />,
          title: 'Media Library Empty',
          description: 'No media items or documents have been uploaded to this category.',
        };
      case 'generic':
      default:
        return {
          icon: <FolderOpen className="w-10 h-10 text-slate-400" />,
          title: 'No Data Available',
          description: 'There are no records to display at this moment.',
        };
    }
  };

  const defaults = getDefaultContent();
  const displayTitle = title || defaults.title;
  const displayDescription = description || defaults.description;
  const displayIcon = icon || defaults.icon;

  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl
        border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40
        ${className}
      `}
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400 shadow-2xs">
        {displayIcon}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
        {displayTitle}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md leading-relaxed">
        {displayDescription}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="flex items-center gap-3 mt-6">
          {secondaryLabel && onSecondaryAction && (
            <Button variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryLabel}
            </Button>
          )}
          {actionLabel && onAction && (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
