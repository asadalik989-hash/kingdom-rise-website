import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DBProject, DBService } from '../../types/database';
import { CardSkeleton } from './Skeletons';
import { ArrowUpRight, MapPin, Calendar, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

// ==========================================
// 1. ProjectCard Component
// ==========================================
export interface ProjectCardProps {
  project?: DBProject;
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (project: DBProject) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isLoading = false,
  isError = false,
  onSelect,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.2;
    const rotateY = ((x - centerX) / centerX) * 2.2;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouchDevice) return;
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  if (isLoading) {
    return <CardSkeleton hasImage={true} lines={2} />;
  }

  if (isError || !project) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6 text-center space-y-2">
        <p className="text-xs font-semibold text-rose-600">Failed to render project details</p>
        <p className="text-[11px] text-slate-500">Record data unavailable</p>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onSelect) {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(project)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        shouldReduceMotion || isTouchDevice
          ? undefined
          : {
              rotateX: tiltStyle.rotateX,
              rotateY: tiltStyle.rotateY,
            }
      }
      transition={{
        rotateX: { duration: 0.18, ease: 'easeOut' },
        rotateY: { duration: 0.18, ease: 'easeOut' },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`
        project-card group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
        overflow-hidden transition-shadow duration-300 shadow-xs hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] focus-visible:ring-offset-2
        cursor-pointer flex flex-col h-full select-none
        ${className}
      `}
    >
      {/* Featured Project Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
        <img
          src={project.featuredImage || '/src/assets/images/projects/kingdom-rise-aramco-infrastructure.jpg'}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
            {project.category || project.sector}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
              project.status === 'Completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Year / Era */}
        {project.year && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-950/80 text-slate-300 backdrop-blur-md">
            {project.year}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-[#0052CC]">{project.client}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {project.location}
            </span>
          </div>

          <h3 className="project-title text-base font-bold text-slate-900 dark:text-slate-100 transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Scope tags & action footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] font-semibold text-slate-500">
            {project.scope && project.scope.length > 0
              ? `${project.scope.length} Scope Deliverables`
              : 'Turnkey Contract'}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0052CC] group-hover:translate-x-0.5 transition-transform">
            <span>View Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. ServiceCard Component
// ==========================================
export interface ServiceCardProps {
  service?: DBService;
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (service: DBService) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isLoading = false,
  isError = false,
  onSelect,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.2;
    const rotateY = ((x - centerX) / centerX) * 2.2;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouchDevice) return;
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  if (isLoading) {
    return <CardSkeleton hasImage={false} lines={3} />;
  }

  if (isError || !service) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6 text-center space-y-2">
        <p className="text-xs font-semibold text-rose-600">Failed to render service</p>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onSelect) {
      e.preventDefault();
      onSelect(service);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(service)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        shouldReduceMotion || isTouchDevice
          ? undefined
          : {
              rotateX: tiltStyle.rotateX,
              rotateY: tiltStyle.rotateY,
            }
      }
      transition={{
        rotateX: { duration: 0.18, ease: 'easeOut' },
        rotateY: { duration: 0.18, ease: 'easeOut' },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`
        group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
        p-6 transition-shadow duration-300 shadow-xs hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C7AE] focus-visible:ring-offset-2
        cursor-pointer flex flex-col justify-between h-full select-none
        ${className}
      `}
    >
      <div className="space-y-4">
        {/* Division Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#0052CC]/10 text-[#0052CC]">
            Division {service?.divisionNumber || '01'}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#00C7AE] group-hover:text-slate-950 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0052CC] transition-colors">
            {service?.title || 'Engineering Service'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
            {service?.shortDesc || ''}
          </p>
        </div>

        {/* Highlights / Capabilities */}
        {service.capabilities && service.capabilities.length > 0 && (
          <ul className="space-y-1.5 pt-2">
            {service.capabilities.slice(0, 3).map((cap, i) => (
              <li key={i} className="text-xs text-slate-500 flex items-center gap-2 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C7AE] shrink-0" />
                <span className="truncate">{cap.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0052CC]">
        <span>Explore Specifications</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.div>
  );
};
