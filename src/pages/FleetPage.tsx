import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { FLEET_CATEGORIES, COMPANY_PROFILE } from '../data/companyData';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  AnimatedSectionHeading,
  AnimatedCard,
  AnimatedButton,
  TRANSITIONS,
  ImageReveal,
} from '../components/motion';
import {
  Truck,
  Wrench,
  Compass,
  Bus,
  CheckCircle2,
  Shield,
  Zap,
  ArrowRight,
  Gauge,
  Sliders,
} from 'lucide-react';

export const FleetPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('01');

  const activeCategory = FLEET_CATEGORIES.find(c => c.categoryNumber === selectedCat) || FLEET_CATEGORIES[0];

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>Chapter 04 · Equipment & Machinery</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Comprehensive Heavy Equipment Fleet
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                Our comprehensive company-owned fleet of modern earthmoving, transportation, mobile power, and Leica precision survey instruments enabling turnkey project execution across Saudi Arabia.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Fleet Overview & Standards */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <AnimatedSectionHeading
                kicker="Fleet Management Rigor"
                title="Rigorous Maintenance, Operator Licensing & Safety"
                description="Kingdom Rise Limited operates an extensive company-owned fleet of modern heavy and earthmoving machinery, transport vehicles, and specialized plant. Our equipment is regularly inspected, serviced, and operated by certified professionals adhering strictly to Saudi safety regulations."
              />

              <StaggerContainer staggerDelay={0.08} className="space-y-3 pt-2">
                <StaggerItem>
                  <div className="flex items-start gap-3 p-4 bg-[#F4F7FA] rounded-xl border border-slate-200">
                    <Wrench className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#333333] block">Regular Servicing & Preventative Upkeep</strong>
                      <span className="text-xs text-[#666666]">Mobile mechanical crews conduct scheduled fluid analyses and preventative overhauls to ensure maximum uptime.</span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-3 p-4 bg-[#F4F7FA] rounded-xl border border-slate-200">
                    <Shield className="w-5 h-5 text-[#00C7AE] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#333333] block">Operator Certification & Training</strong>
                      <span className="text-xs text-[#666666]">Every operator undergoes continuous defensive driving, HSE training, and certified third-party competency tests.</span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-3 p-4 bg-[#F4F7FA] rounded-xl border border-slate-200">
                    <Gauge className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#333333] block">Third-Party Calibration Standards</strong>
                      <span className="text-xs text-[#666666]">All precision total stations, theodolites, and testing instruments are certified by accredited laboratories.</span>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="scale-up" delay={0.15}>
                <ImageReveal
                  src="/src/assets/images/fleet/kingdom-rise-heavy-equipment-fleet.jpg"
                  alt="Kingdom Rise Limited Heavy Equipment Lineup"
                  badge="270+ UNITS · 100% COMPANY OWNED"
                  className="rounded-2xl border border-slate-800 shadow-2xl"
                />
              </Reveal>

              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-4">
                <StaggerItem>
                  <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-xs">
                    <span className="text-2xl font-bold font-mono text-[#00C7AE] block mb-1">
                      <AnimatedCounter value="2018+" />
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Fleet Model Years</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-xs">
                    <span className="text-2xl font-bold font-mono text-white block mb-1">
                      <AnimatedCounter value="100%" />
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Company Owned Assets</span>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Categorized Fleet Inventory Tabs */}
      <section className="py-16 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <AnimatedSectionHeading
              kicker="Live Fleet Inventory"
              title="Verified Machinery & Plant by Category"
            />
          </div>

          {/* Interactive Category Selector with motion tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FLEET_CATEGORIES.map((cat) => {
              const isSelected = cat.categoryNumber === selectedCat;
              return (
                <button
                  key={cat.categoryNumber}
                  onClick={() => setSelectedCat(cat.categoryNumber)}
                  className={`relative p-4 rounded-xl border text-left transition-colors cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'text-white border-[#0052CC]'
                      : 'bg-white text-[#333333] border-slate-200 hover:bg-[#EBF2FC]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFleetTab"
                      className="absolute inset-0 bg-[#0052CC] rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 space-y-1">
                    <span className={`text-[10px] font-mono font-bold block ${isSelected ? 'text-[#00C7AE]' : 'text-slate-400'}`}>
                      CATEGORY {cat.categoryNumber}
                    </span>
                    <strong className="text-xs font-bold block">
                      {cat.title}
                    </strong>
                    <span className={`text-[11px] block ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                      {cat.items.length} Distinct Machine Types
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Category Items List with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.categoryNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-mono font-bold text-[#0052CC] uppercase">CATEGORY {activeCategory.categoryNumber}</span>
                <h3 className="text-xl font-bold text-[#333333]">{activeCategory.title}</h3>
                <p className="text-xs text-[#666666] mt-1">{activeCategory.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory.items.map((item, idx) => (
                  <AnimatedCard key={idx} hoverLift={-3} className="p-4 bg-[#F4F7FA] rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <strong className="text-sm font-bold text-[#333333] block">{item.name}</strong>
                      <span className="text-xs text-slate-500 font-mono mt-0.5 block">{item.specs}</span>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 bg-white text-[#0052CC] text-xs font-bold rounded-lg border border-[#0052CC]/20 font-mono shadow-xs shrink-0">
                      Standard Issue
                    </span>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Real Field Machinery Deployments Showcase */}
          <div className="space-y-6 pt-6">
            <AnimatedSectionHeading
              kicker="Field Operations"
              title="Heavy Fleet Deployed Across Saudi Project Corridors"
              description="Real-world site operations utilizing our specialized earthmoving, deep drilling, and paving machinery under rigorous Saudi HSE standards."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal variant="scale-up" delay={0.1}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-tabuk-earthwork.jpg"
                  alt="Hyundai Crawler Excavators & Hydraulic Rock Breakers in Tabuk"
                  badge="TABUK & BUQAYLAH · ROCK EXCAVATION"
                  className="rounded-2xl border border-slate-200 shadow-md"
                />
              </Reveal>
              <Reveal variant="scale-up" delay={0.15}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-deep-piling.jpg"
                  alt="Bauer BG 25 C Rotary Drilling Rig Deep Foundation Boring"
                  badge="POWER CORRIDOR · ROTARY PILING"
                  className="rounded-2xl border border-slate-200 shadow-md"
                />
              </Reveal>
              <Reveal variant="scale-up" delay={0.2}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-asphalt-paving.jpg"
                  alt="Dynapac Road Rollers & Highway Asphalt Paving"
                  badge="MAKKAH PROVINCE · HIGHWAY PAVING"
                  className="rounded-2xl border border-slate-200 shadow-md"
                />
              </Reveal>
            </div>
          </div>

          {/* Fleet Call to Action */}
          <Reveal delay={0.15}>
            <div className="p-8 bg-[#0B1528] text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold">Require Equipment Fleet for Joint Venture or Project Lease?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  We deploy wet-lease or dry-lease packages with certified operators and preventative maintenance teams.
                </p>
              </div>
              <AnimatedButton
                onClick={() => navigateTo('quote', { prefillProject: 'Heavy Equipment & Fleet Lease' })}
                variant="gradient"
                icon={<ArrowRight className="w-4 h-4 text-white" />}
                className="whitespace-nowrap"
              >
                Inquire About Machinery Lease
              </AnimatedButton>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
};
