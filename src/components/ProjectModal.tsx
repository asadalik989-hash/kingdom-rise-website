import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Calendar, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { TRANSITIONS } from './motion/MotionConfig';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, navigateTo, lang, t } = useApp();

  const handleInquire = () => {
    if (!selectedProject) return;
    const title = selectedProject.title;
    setSelectedProject(null);
    navigateTo('quote', { prefillProject: title });
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs text-[#00C7AE] font-semibold tracking-wider uppercase font-mono">
                <span>{selectedProject.sector}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.category}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t.common.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Title & Metadata */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span className="font-semibold text-white">{t.projects.clientHeader}:</span>
                    <span>{selectedProject.client}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span className="font-mono tabular-nums">{selectedProject.year}</span>
                  </div>
                </div>
              </div>

              {/* Project Visual Image */}
              {(selectedProject.featuredImage || (selectedProject as any).image) && (
                <div className="rounded-xl overflow-hidden border border-slate-800 relative aspect-video bg-slate-950">
                  <img
                    src={selectedProject.featuredImage || (selectedProject as any).image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
              )}

              {/* Detailed Project Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'AR' ? 'نبذة عن المشروع والمواصفات الفنية' : 'Project Overview & Engineering Summary'}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedProject.description}
                </p>
              </div>

              {/* Scope of Work */}
              {selectedProject.scope && selectedProject.scope.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.projects.scopeHeader}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00C7AE] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  {lang === 'AR'
                    ? 'سجل معتمد وموثق ضمن محفظة مشاريع شركة نهضة المملكة المحدودة.'
                    : 'Verified record from Kingdom Rise Limited Corporate Portfolio.'}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    {t.common.close}
                  </button>
                  <button
                    onClick={handleInquire}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    <span>{t.projects.requestSimilarBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00C7AE] rtl:rotate-180" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
