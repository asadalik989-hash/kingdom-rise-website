import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  AnimatedButton,
  TRANSITIONS,
  ImageReveal,
} from '../components/motion';
import {
  Building,
  Zap,
  Wrench,
  Cpu,
  CheckCircle2,
  Users,
  ArrowRight,
  Layers,
  Sparkles,
  PhoneCall,
  FileText,
} from 'lucide-react';
import { DBService } from '../types/database';
import { SkeletonPulse } from '../components/ui/Skeletons';
import { ErrorBoundary } from '../components/ErrorBoundary';

/**
 * Safely extracts a division number string from any service / division document structure
 */
function extractDivisionNumber(service?: Partial<DBService> | null, fallbackIndex: number = 0): string {
  if (!service) return String(fallbackIndex + 1).padStart(2, '0');
  
  const rawNum =
    service.divisionNumber ??
    (service as Record<string, any>)?.division?.divisionNumber ??
    (service as Record<string, any>)?.division_number;

  if (typeof rawNum === 'string' && rawNum.trim().length > 0) {
    return rawNum.trim();
  }
  if (typeof rawNum === 'number') {
    return String(rawNum).padStart(2, '0');
  }

  // Derive from known service IDs
  if (service.id === 'civil-engineering') return '01';
  if (service.id === 'electrical-engineering') return '02';
  if (service.id === 'mechanical-engineering') return '03';
  if (service.id === 'specialized-services') return '04';

  return String(fallbackIndex + 1).padStart(2, '0');
}

/**
 * Normalizes a DBService object to guarantee all required fields and array properties are defined
 */
function normalizeService(service?: Partial<DBService> | null, index: number = 0): DBService {
  const divisionNum = extractDivisionNumber(service, index);
  return {
    id: service?.id || `service-${divisionNum}`,
    divisionNumber: divisionNum,
    categoryId: service?.categoryId || '',
    title: service?.title || (divisionNum === '01' ? 'Civil Engineering' : `Division ${divisionNum}`),
    slug: service?.slug || service?.id || `division-${divisionNum}`,
    shortDesc: service?.shortDesc || '',
    fullDesc: service?.fullDesc || service?.shortDesc || '',
    capabilities: Array.isArray(service?.capabilities) ? service.capabilities : [],
    teamComposition: Array.isArray(service?.teamComposition) ? service.teamComposition : [],
    keyHighlights: Array.isArray(service?.keyHighlights) ? service.keyHighlights : [],
    image: service?.image || '/src/assets/images/services/kingdom-rise-civil-engineering.jpg',
    isPublished: service?.isPublished !== false,
    seoTitle: service?.seoTitle || '',
    seoDescription: service?.seoDescription || '',
    createdAt: service?.createdAt || new Date().toISOString(),
    updatedAt: service?.updatedAt || new Date().toISOString(),
  };
}

const ServicesPageContent: React.FC = () => {
  const { services, navigateTo, lang, t, isDbLoading } = useApp();
  const [activeDivision, setActiveDivision] = useState<string>('civil-engineering');

  // Filter and safely normalize all services
  const validServices: DBService[] = Array.isArray(services)
    ? services
        .filter((s): s is DBService => Boolean(s && typeof s === 'object'))
        .map((s, idx) => normalizeService(s, idx))
    : [];

  // Safely find the selected service, or fall back to the first available service, or null
  const currentService: DBService | null =
    validServices.find((s) => s.id === activeDivision) ||
    validServices[0] ||
    null;

  const getServiceTitle = (id?: string, defaultTitle?: string): string => {
    const fallbackTitle = (defaultTitle || '').replace(' Services', '');
    if (!id) return fallbackTitle;
    if (lang !== 'AR') return fallbackTitle;

    switch (id) {
      case 'civil-engineering':
        return t.services.civil.title;
      case 'electrical-engineering':
        return t.services.electrical.title;
      case 'mechanical-engineering':
        return t.services.mechanical.title;
      case 'specialized-services':
        return t.services.scada.title;
      default:
        return defaultTitle || fallbackTitle;
    }
  };

  const getServiceDesc = (id?: string, defaultDesc?: string): string => {
    const fallbackDesc = defaultDesc || '';
    if (!id || lang !== 'AR') return fallbackDesc;

    switch (id) {
      case 'civil-engineering':
        return t.services.civil.fullDesc;
      case 'electrical-engineering':
        return t.services.electrical.fullDesc;
      case 'mechanical-engineering':
        return t.services.mechanical.fullDesc;
      case 'specialized-services':
        return t.services.scada.fullDesc;
      default:
        return fallbackDesc;
    }
  };

  const getServiceIcon = (id?: string) => {
    switch (id) {
      case 'civil-engineering':
        return <Building className="w-5 h-5 text-[#0052CC]" />;
      case 'electrical-engineering':
        return <Zap className="w-5 h-5 text-[#0052CC]" />;
      case 'mechanical-engineering':
        return <Wrench className="w-5 h-5 text-[#0052CC]" />;
      case 'specialized-services':
        return <Cpu className="w-5 h-5 text-[#0052CC]" />;
      default:
        return <Layers className="w-5 h-5 text-[#0052CC]" />;
    }
  };

  return (
    <div className="bg-[#F4F7FA] text-[#333333]">
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>
                  {lang === 'AR'
                    ? 'القطاعات والخدمات الهندسية'
                    : 'Chapter 03 · Engineering Disciplines'}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {t.services.pageTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                {t.services.pageSubtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Interactive Discipline Switcher */}
      <section className="py-3 sm:py-6 bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Skeleton for switcher */}
          {isDbLoading && validServices.length === 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[150px] sm:min-w-0 p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-[#F4F7FA] space-y-2 shrink-0">
                  <SkeletonPulse className="w-8 h-8 rounded-lg" />
                  <SkeletonPulse className="w-16 h-3" />
                  <SkeletonPulse className="w-24 sm:w-28 h-4" />
                </div>
              ))}
            </div>
          ) : validServices.length > 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {validServices.map((serv, idx) => {
                const isSelected = (currentService && serv.id === currentService.id) || (!currentService && idx === 0);
                const divisionLabel = lang === 'AR' ? `القطاع ${serv.divisionNumber}` : `DIVISION ${serv.divisionNumber}`;
                const titleText = getServiceTitle(serv.id, serv.title);

                return (
                  <button
                    key={serv.id || `division-${idx}`}
                    type="button"
                    onClick={() => setActiveDivision(serv.id)}
                    className={`relative p-2.5 sm:p-3.5 rounded-xl border text-left rtl:text-right transition-colors flex items-center justify-between cursor-pointer focus:outline-none shrink-0 min-w-[155px] sm:min-w-0 flex-1 ${
                      isSelected
                        ? 'text-white border-[#0052CC]'
                        : 'bg-[#F4F7FA] text-[#333333] border-slate-200 hover:bg-[#EBF2FC] hover:text-[#0052CC]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeDivisionBg"
                        className="absolute inset-0 bg-[#0052CC] rounded-xl shadow-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="shrink-0">{getServiceIcon(serv.id)}</div>
                      <div className="min-w-0">
                        <span
                          className={`text-[9px] sm:text-[10px] block font-mono font-bold ${
                            isSelected ? 'text-[#00C7AE]' : 'text-slate-400'
                          }`}
                        >
                          {divisionLabel}
                        </span>
                        <span className="text-xs font-bold block truncate max-w-[110px] sm:max-w-[140px]">
                          {titleText}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* 3. Detailed Service Showcase with Smooth Division Transitions */}
      <section className="py-16 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Skeleton Showcase */}
          {isDbLoading && !currentService && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <SkeletonPulse className="w-32 h-4" />
                  <SkeletonPulse className="w-2/3 h-8" />
                  <SkeletonPulse className="w-full h-16" />
                </div>
                <div className="space-y-3">
                  <SkeletonPulse className="w-40 h-4" />
                  <SkeletonPulse className="w-full h-24 rounded-xl" />
                  <SkeletonPulse className="w-full h-24 rounded-xl" />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-6">
                <SkeletonPulse className="w-full aspect-video rounded-2xl" />
                <SkeletonPulse className="w-full h-48 rounded-2xl" />
              </div>
            </div>
          )}

          {/* Empty State Banner when no services exist */}
          {!isDbLoading && validServices.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#0052CC]/10 text-[#0052CC] flex items-center justify-center mx-auto">
                <Layers className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#333333]">
                  {lang === 'AR' ? 'تحديث الخدمات الهندسية' : 'Engineering Services Update'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'AR'
                    ? 'يتم تحديث الخدمات حالياً. يرجى التواصل معنا للحصول على مزيد من المعلومات.'
                    : 'Services are currently being updated. Please contact us for more information.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0041A3] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{lang === 'AR' ? 'تواصل مع الإدارة الهندسية' : 'Contact Engineering Office'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('quote')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'AR' ? 'طلب عرض أسعار' : 'Request RFQ'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Active Service Showcase */}
          {currentService && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left: Overview, Capabilities, and Scope */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Service Header Card */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0052CC] uppercase">
                      <span>
                        {lang === 'AR'
                          ? `القطاع ${currentService.divisionNumber}`
                          : `DIVISION ${currentService.divisionNumber}`}
                      </span>
                      <span>·</span>
                      <span>
                        {lang === 'AR'
                          ? 'شركة نهضة المملكة المحدودة'
                          : 'Kingdom Rise Limited Directorate'}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#333333]">
                      {getServiceTitle(currentService.id, currentService.title)}
                    </h2>
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {getServiceDesc(currentService.id, currentService.fullDesc)}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  {Array.isArray(currentService.capabilities) &&
                    currentService.capabilities.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {t.services.capabilitiesTitle}
                        </h3>
                        <StaggerContainer
                          staggerDelay={0.06}
                          className="grid grid-cols-1 gap-4"
                        >
                          {currentService.capabilities.map((cap, idx) => (
                            <StaggerItem key={idx}>
                              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-1.5 hover:border-[#00C7AE] transition-colors">
                                <div className="flex items-center gap-2 text-[#333333] font-bold text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-[#00C7AE] shrink-0" />
                                  <span>{cap?.title || 'Engineering Capability'}</span>
                                </div>
                                {cap?.desc && (
                                  <p className="text-xs text-[#666666] pl-6 rtl:pl-0 rtl:pr-6 leading-relaxed">
                                    {cap.desc}
                                  </p>
                                )}
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    )}

                  {/* Verified Highlights */}
                  {Array.isArray(currentService.keyHighlights) &&
                    currentService.keyHighlights.length > 0 && (
                      <div className="bg-[#0B1528] text-white p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00C7AE]">
                          <Sparkles className="w-4 h-4" />
                          <span>{t.services.highlightsTitle}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {currentService.keyHighlights.map((hl, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-slate-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE] shrink-0 mt-1.5" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Right: Technical Team & Quick RFQ Trigger */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                  {/* Division Visual */}
                  {currentService.image && (
                    <ImageReveal
                      src={currentService.image}
                      alt={currentService.title || 'Engineering division'}
                      badge={lang === 'AR' ? `القطاع ${currentService.divisionNumber}` : `DIVISION ${currentService.divisionNumber}`}
                      className="rounded-2xl border border-slate-200 shadow-md"
                    />
                  )}

                  {/* Technical Team Composition */}
                  {Array.isArray(currentService.teamComposition) &&
                    currentService.teamComposition.length > 0 && (
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                        <div className="flex items-center gap-2 text-[#333333] font-bold text-sm">
                          <Users className="w-4 h-4 text-[#0052CC]" />
                          <span>{t.services.teamTitle}</span>
                        </div>
                        <ul className="space-y-2 text-xs text-[#666666]">
                          {currentService.teamComposition.map((team, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                              <span>{team}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Direct Tender Engagement Box */}
                  <div className="p-6 bg-[#EBF2FC] rounded-2xl border border-[#0052CC]/20 text-[#333333] space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC] block">
                      {lang === 'AR'
                        ? 'استفسارات المشتريات والمناقصات'
                        : 'Procurement Inquiries'}
                    </span>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {lang === 'AR'
                        ? `هل ترغب في طلب عرض أسعار لمناقصة في قطاع ${getServiceTitle(
                            currentService.id,
                            currentService.title
                          )}؟ يمكن لفريق التقديرات تزويدكم بدراسة فنية وعرض سعر رسمي.`
                        : `Need sub-contracting or full turnkey bids for ${(
                            currentService.title || 'this division'
                          ).replace(' Services', '')}? Our senior estimation team can provide preliminary engineering proposals.`}
                    </p>
                    <AnimatedButton
                      onClick={() =>
                        navigateTo('quote', {
                          prefillProject: currentService.title || '',
                        })
                      }
                      variant="gradient"
                      icon={
                        <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
                      }
                      className="w-full text-center"
                    >
                      {t.services.requestScopeQuote}
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <ErrorBoundary componentName="ServicesPage">
      <ServicesPageContent />
    </ErrorBoundary>
  );
};
