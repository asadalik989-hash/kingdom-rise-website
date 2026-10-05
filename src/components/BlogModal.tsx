import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, User, ArrowRight, Bookmark } from 'lucide-react';
import { TRANSITIONS } from './motion/MotionConfig';

export const BlogModal: React.FC = () => {
  const { selectedBlogPost, setSelectedBlogPost, navigateTo } = useApp();

  return (
    <AnimatePresence>
      {selectedBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedBlogPost(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00C7AE] tracking-wider uppercase">
                <Bookmark className="w-3.5 h-3.5 text-[#00C7AE]" />
                <span>{selectedBlogPost.category}</span>
              </div>
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
                  {selectedBlogPost.title}
                </h2>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00C7AE]" />
                    <span>{selectedBlogPost.date}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00C7AE]" />
                    <span>{selectedBlogPost.readTime}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00C7AE]" />
                    <span>{selectedBlogPost.author}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm italic">
                "{selectedBlogPost.summary}"
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                {selectedBlogPost.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {selectedBlogPost.tags && selectedBlogPost.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-medium">Related Topics:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlogPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Close Article
                </button>
                <button
                  onClick={() => {
                    setSelectedBlogPost(null);
                    navigateTo('quote');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <span>Contact Our Engineering Team</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00C7AE]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
