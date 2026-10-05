import React from 'react';

// Reusable Base Skeleton Pulse
export const SkeletonPulse: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => (
  <div
    style={style}
    className={`bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md ${className}`}
  />
);

// 1. Card Skeleton (For Projects, Services, Blog)
export const CardSkeleton: React.FC<{ hasImage?: boolean; lines?: number }> = ({
  hasImage = true,
  lines = 3,
}) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 overflow-hidden shadow-2xs">
    {hasImage && (
      <SkeletonPulse className="w-full h-48 rounded-xl" />
    )}
    <div className="space-y-2">
      <SkeletonPulse className="w-1/3 h-4" />
      <SkeletonPulse className="w-4/5 h-6" />
    </div>
    <div className="space-y-1.5 pt-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonPulse
          key={i}
          className={`h-3.5 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <SkeletonPulse className="w-24 h-4" />
      <SkeletonPulse className="w-16 h-8 rounded-lg" />
    </div>
  </div>
);

// 2. Table Skeleton (For Admin Dashboard & CMS)
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 5,
}) => (
  <div className="w-full overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
    {/* Table Header */}
    <div className="grid grid-flow-col auto-cols-fr gap-4 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonPulse key={i} className="h-4 w-3/4" />
      ))}
    </div>
    {/* Table Rows */}
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid grid-flow-col auto-cols-fr gap-4 p-4 items-center">
          {Array.from({ length: columns }).map((_, c) => (
            <SkeletonPulse
              key={c}
              className={`h-3.5 ${c === 0 ? 'w-4/5' : c === columns - 1 ? 'w-16 h-7 rounded' : 'w-2/3'}`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// 3. Form Loading Skeleton
export const FormSkeleton: React.FC<{ fields?: number }> = ({ fields = 4 }) => (
  <div className="space-y-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
    <SkeletonPulse className="w-1/3 h-6 mb-4" />
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <SkeletonPulse className="w-1/4 h-3.5" />
        <SkeletonPulse className="w-full h-10 rounded-lg" />
      </div>
    ))}
    <div className="pt-3 flex justify-end gap-3">
      <SkeletonPulse className="w-20 h-10 rounded-lg" />
      <SkeletonPulse className="w-32 h-10 rounded-lg" />
    </div>
  </div>
);

// 4. Dashboard Skeleton
export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Metric Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
        >
          <div className="flex items-center justify-between">
            <SkeletonPulse className="w-24 h-3.5" />
            <SkeletonPulse className="w-8 h-8 rounded-lg" />
          </div>
          <SkeletonPulse className="w-16 h-7" />
          <SkeletonPulse className="w-32 h-3" />
        </div>
      ))}
    </div>

    {/* Big Section Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <TableSkeleton rows={4} columns={4} />
      </div>
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <SkeletonPulse className="w-1/2 h-5" />
        <SkeletonPulse className="w-full h-32 rounded-lg" />
        <SkeletonPulse className="w-3/4 h-4" />
        <SkeletonPulse className="w-2/3 h-4" />
      </div>
    </div>
  </div>
);

// 5. Page Loading Skeleton
export const PageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
    <div className="space-y-3 max-w-2xl">
      <SkeletonPulse className="w-32 h-4" />
      <SkeletonPulse className="w-3/4 h-10" />
      <SkeletonPulse className="w-full h-4" />
      <SkeletonPulse className="w-4/5 h-4" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);
