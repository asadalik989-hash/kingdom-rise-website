import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  TRANSITIONS,
  ImageReveal,
} from '../components/motion';
import { Search, Calendar, Clock, User, ArrowRight, Bookmark } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, setSelectedBlogPost } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Infrastructure', 'Power & Electrical', 'Process Automation'];

  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory !== 'all' && post.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSummary = post.summary.toLowerCase().includes(q);
      return matchTitle || matchSummary;
    }
    return true;
  });

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>Chapter 09 · Technical Insights</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Engineering Insights & Industry Updates
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                Technical articles, case studies, and engineering perspectives from Kingdom Rise Limited's senior civil, electrical, and MEP specialists across Saudi Arabia.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filters */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category tabs with motion sliding pill */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="blogCatActive"
                      className="absolute inset-0 bg-[#0052CC] rounded shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat === 'all' ? 'All Insights' : cat}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#F4F7FA] border border-slate-300 rounded focus:outline-none focus:border-[#0052CC] focus:bg-white transition-colors text-[#333333] placeholder:text-[#888888]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Articles Grid with Stagger & Animated Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
                >
                  <AnimatedCard
                    onClick={() => setSelectedBlogPost(post)}
                    tilt
                    glow
                    hoverLift={-5}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full group"
                  >
                    <div>
                      <ImageReveal
                        src={
                          post.category === 'Power & Electrical'
                            ? '/src/assets/images/services/kingdom-rise-electrical-engineering.jpg'
                            : post.category === 'Process Automation'
                            ? '/src/assets/images/technology/kingdom-rise-technology-bim.jpg'
                            : '/src/assets/images/services/kingdom-rise-civil-engineering.jpg'
                        }
                        alt={post.title}
                        badge={post.category}
                      />

                      <div className="p-6 space-y-4">
                        {/* Read Time */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="text-[#0052CC] font-semibold">{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.readTime}</span>
                        </div>

                      <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#0052CC] transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.date}</span>
                        </div>
                        <span aria-hidden="true">·</span>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{post.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="px-6 pb-6 pt-0">
                      <div className="text-xs font-semibold text-[#0052CC] group-hover:text-[#0041A3] flex items-center justify-between border-t border-slate-100 pt-3">
                        <span>Read Technical Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#00C7AE]" />
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

    </div>
  );
};
