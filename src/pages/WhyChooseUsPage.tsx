import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_PROFILE } from '../data/companyData';
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
  Layers,
  Users,
  Truck,
  Trophy,
  Handshake,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const WhyChooseUsPage: React.FC = () => {
  const { navigateTo } = useApp();

  const strengths = [
    {
      icon: <Layers className="w-6 h-6 text-[#0052CC]" />,
      title: "Integrated Turnkey Services",
      points: [
        "One-stop solution for Civil, Electrical, and Mechanical disciplines",
        "Single point of executive contact and contract accountability",
        "Elimination of interface friction between disparate trade subcontractors",
        "Proven 15-20% overall cost and schedule optimization for clients",
      ],
    },
    {
      icon: <Users className="w-6 h-6 text-[#0052CC]" />,
      title: "Skilled Technical Workforce",
      points: [
        "Multidisciplinary cadre of licensed civil, electrical & MEP engineers",
        "Average of 8+ years hands-on field experience in Saudi Arabia",
        "ASME-certified welders, high-precision surveyors & instrument techs",
        "Mandatory quarterly skills refreshment and technical certification",
      ],
    },
    {
      icon: <Truck className="w-6 h-6 text-[#0052CC]" />,
      title: "Comprehensive Modern Equipment Fleet",
      points: [
        "Modern company-owned fleet (2018+ vintage standard)",
        "Heavy excavators, bulldozers, boom trucks, lowbeds, and generators",
        "Leica Total Stations calibrated to international accuracy benchmarks",
        "High fleet utilization with minimal breakdown or project downtime",
      ],
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#0052CC]" />,
      title: "Proven Track Record Since 2002",
      points: [
        "53+ major contracts successfully completed without litigation",
        "20+ civil packages, 25+ electrical, 15+ mechanical installations",
        "100% on-time delivery record across public and private sector tenders",
        "Financial bonding capacity to undertake major infrastructure packages",
      ],
    },
    {
      icon: <Handshake className="w-6 h-6 text-[#0052CC]" />,
      title: "Elite Strategic Relationships",
      points: [
        "Approved contractor for Saudi Aramco, Ministry of Defense & SEC",
        "Repeat contract status with SWCC, MARAFIQ, and Saudi Airlines Cargo",
        "Long-term industrial partnership with IFFCO and TETRA Pack",
        "Financially backed by SNB and Al Rajhi Bank",
      ],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00C7AE]" />,
      title: "Rigorous Quality & Zero-Accident Safety",
      points: [
        "Strict 0 LTI target with comprehensive written Accident Prevention Program",
        "10 full-time site safety supervisors ensuring 100% PPE compliance",
        "Project Quality Initiative (PQI) with third-party testing attestations",
        "ISO & SASO quality compliance across all construction procedures",
      ],
    },
  ];

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>Chapter 08 · Competitive Advantages</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Why Choose Kingdom Rise Limited
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                Discover the six core pillars that distinguish Kingdom Rise Limited as the preferred construction partner for major infrastructure, government, and industrial projects across Saudi Arabia.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Numeric Proof Strip */}
      <section className="bg-slate-900 border-b border-slate-800 py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#00C7AE] font-mono block">
                <AnimatedCounter value="2002" duration={1.2} />
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Engineering Heritage</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">
                <AnimatedCounter value="53+" duration={1.4} />
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Verified Contracts</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">
                <AnimatedCounter value="100%" duration={1.6} />
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Company-Owned Fleet</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#00C7AE] font-mono block">
                0 LTI
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Loss Prevention Target</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Strengths Grid */}
      <section className="py-20 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <AnimatedSectionHeading
              align="center"
              kicker="Core Foundations"
              title="Six Operational Pillars of Superior Delivery"
              description="Each pillar is reinforced by internal operating procedures, audited ISO management systems, and senior engineering oversight."
            />
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengths.map((str, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard tilt glow hoverLift={-5} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EBF2FC] border border-[#0052CC]/20 flex items-center justify-center transition-transform group-hover:scale-110">
                      {str.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#0052CC] transition-colors">
                      {str.title}
                    </h3>
                    <ul className="space-y-2.5 text-xs text-[#666666] pt-2 border-t border-slate-100">
                      {str.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00C7AE] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Workforce & Engineering Quality Visual Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
            <Reveal variant="scale-up" delay={0.1}>
              <ImageReveal
                src="/src/assets/images/safety/kingdom-rise-safety-quality.jpg"
                alt="Kingdom Rise Limited Engineering Workforce & Safety Supervision"
                badge="100% PPE COMPLIANCE · ZERO LTI"
                className="rounded-2xl border border-slate-200 shadow-xl"
              />
            </Reveal>
            <Reveal variant="scale-up" delay={0.2}>
              <ImageReveal
                src="/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg"
                alt="Kingdom Rise Major Saudi Infrastructure Construction Site"
                badge="MAJOR SAUDI INFRASTRUCTURE"
                className="rounded-2xl border border-slate-200 shadow-xl"
              />
            </Reveal>
          </div>

          {/* CTA Banner */}
          <Reveal delay={0.15}>
            <div className="bg-[#0B1528] text-white rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold">Require a Prequalification Dossier for Your Tender Board?</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  We supply comprehensive prequalification packages including ISO audits, CR documents, audited financial statements, and client completion certificates.
                </p>
              </div>
              <AnimatedButton
                onClick={() => navigateTo('contact')}
                variant="gradient"
                icon={<ArrowRight className="w-4 h-4 text-white" />}
                className="whitespace-nowrap py-3.5 px-6"
              >
                Request Prequalification Dossier
              </AnimatedButton>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
};
