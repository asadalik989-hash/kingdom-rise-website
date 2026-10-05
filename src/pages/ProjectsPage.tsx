import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Reveal,
  TRANSITIONS,
} from '../components/motion';
import { ProjectCard } from '../components/ui/Cards';
import { SearchInput } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/Skeletons';
import { Button } from '../components/ui/Button';
import { DBProject } from '../types/database';
import {
  HardHat,
  Filter,
  Check,
  RefreshCw,
  X,
  FileCheck2,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, setSelectedProject, isDbLoading, openTenderModal } = useApp();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const eras = [
    { id: 'all', label: 'All Eras' },
    { id: '2021-2023+', label: '2021-2023+ (Recent & Ongoing)' },
    { id: '2016-2020', label: '2016-2020 (Major Infrastructure)' },
    { id: '2009-2015', label: '2009-2015 (Growth Period)' },
    { id: '2002-2008', label: '2002-2008 (Foundational Works)' },
  ];

  const sectors = [
    { id: 'all', label: 'All Sectors' },
    { id: 'Civil', label: 'Civil Infrastructure' },
    { id: 'Electrical', label: 'Electrical & Power' },
    { id: 'Mechanical', label: 'Mechanical & HVAC' },
    { id: 'Oil & Gas', label: 'Oil, Gas & Petrochemical' },
    { id: 'Water & Power', label: 'Water & Desalination' },
    { id: 'Aviation', label: 'Aviation & Cargo' },
  ];

  // Sector project count map
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    sectors.forEach((sec) => {
      if (sec.id !== 'all') {
        counts[sec.id] = projects.filter((p) => p.sector === sec.id).length;
      }
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // Era filter
      if (selectedEra !== 'all' && proj.era !== selectedEra) return false;

      // Sector filter
      if (selectedSector !== 'all' && proj.sector !== selectedSector) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = proj.title.toLowerCase().includes(q);
        const matchClient = proj.client.toLowerCase().includes(q);
        const matchLocation = proj.location.toLowerCase().includes(q);
        const matchDesc = proj.description?.toLowerCase().includes(q);
        return matchTitle || matchClient || matchLocation || matchDesc;
      }

      return true;
    });
  }, [projects, selectedEra, selectedSector, searchQuery]);

  const hasActiveFilters = selectedEra !== 'all' || selectedSector !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedEra('all');
    setSelectedSector('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                  <span>Chapter 06 · Verified Engineering Track Record</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Project Portfolio & Contracts
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-slate-300 leading-relaxed">
                  Showcasing 53+ successfully delivered contracts across high-voltage transmission, petrochemical plants, airport facilities, and deep civil foundations in Saudi Arabia since 2002.
                </p>
              </Reveal>
            </div>

            <div className="shrink-0">
              <Button
                variant="secondary"
                size="md"
                onClick={() => openTenderModal(selectedSector !== 'all' ? selectedSector : undefined)}
                leftIcon={<FileCheck2 className="w-4 h-4" />}
              >
                Prequalify for Tender
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Interactive Filter Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full md:w-80">
              <SearchInput
                placeholder="Search by client, title, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Results Count & Quick Reset */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-600">
              <span>
                Showing{' '}
                <strong className="text-[#333333] font-mono tabular-nums">
                  {filteredProjects.length}
                </strong>{' '}
                of {projects.length} verified projects
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 rounded bg-slate-100 text-[#0052CC] hover:bg-slate-200 font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
            {/* Sector Tabs with Counter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Discipline:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {sectors.map((sec) => {
                  const isSelected = selectedSector === sec.id;
                  const count = sectorCounts[sec.id] || 0;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id)}
                      className={`relative px-3 py-1.5 font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="sectorActiveTab"
                          className="absolute inset-0 bg-[#0052CC] rounded-lg shadow-xs"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{sec.label}</span>
                      <span
                        className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Era Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Era:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {eras.map((era) => {
                  const isSelected = selectedEra === era.id;
                  return (
                    <button
                      key={era.id}
                      onClick={() => setSelectedEra(era.id)}
                      className={`relative px-3 py-1.5 font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'text-[#0052CC] font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="eraActiveTab"
                          className="absolute inset-0 bg-white rounded-lg shadow-xs"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{era.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Project Gallery with State Integration */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* State: LOADING */}
          {isDbLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} hasImage={true} lines={2} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            /* State: NO_RESULTS */
            <EmptyState
              type="search"
              title="No Projects Match Selected Criteria"
              description={`No contracts found matching "${searchQuery || `${selectedSector} in ${selectedEra}`}". Reset your filters or broaden your query to view our 53+ verified projects.`}
              actionLabel="Clear Filters & View All"
              onAction={handleResetFilters}
            />
          ) : (
            /* State: LOADED */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
