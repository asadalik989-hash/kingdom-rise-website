import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COMPANY_PROFILE } from '../data/companyData';
import { KRCLogo } from '../components/KRCLogo';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  AnimatedSectionHeading,
  AnimatedCard,
  AnimatedButton,
  TestimonialCarousel,
  TRANSITIONS,
  Hero3DExperience,
  ImageReveal,
} from '../components/motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Building,
  Zap,
  Wrench,
  ChevronRight,
  Building2,
  Quote,
  Cpu,
  Layers,
  Sparkles,
  Leaf,
  Settings2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, setSelectedProject, projects, testimonials, lang, t } = useApp();
  const [projectSectorFilter, setProjectSectorFilter] = useState<string>('all');

  // Filter featured projects
  const filteredProjects = projects.filter((p) => {
    if (projectSectorFilter === 'all') return true;
    return p.sector.toLowerCase() === projectSectorFilter.toLowerCase();
  }).slice(0, 6);

  return (
    <div className="bg-[#F4F7FA] text-[#333333]">
      
      {/* 1. CINEMATIC 3D HERO SECTION (7 LAYERS, SCALE ENTRANCE, CSS 3D LATTICE, PARALLAX) */}
      <Hero3DExperience
        heroImage="/src/assets/images/corporate/kingdom-rise-saudi-infrastructure-hero.jpg"
        kicker={t.home.kicker}
        companyName={COMPANY_PROFILE.name}
        title={t.home.heroTitle}
        subtitle={t.home.heroSub}
        ctaQuoteText={t.home.heroCtaQuote}
        ctaProjectsText={t.home.heroCtaProjects}
        onQuoteClick={() => navigateTo('quote')}
        onProjectsClick={() => navigateTo('projects')}
        lang={lang}
        metrics={{
          projectsTitle: t.home.metrics.projectsTitle,
          fleetTitle: t.home.metrics.fleetTitle,
          safetyTitle: t.home.metrics.safetyTitle,
          onTimeDelivery: lang === 'AR' ? 'تسليم في الموعد' : 'On-Time Delivery',
        }}
      />

      {/* 2. CORPORATE INTRODUCTION & STRATEGIC STATEMENT WITH AUTHENTIC JEDDAH HQ IMAGE */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <AnimatedSectionHeading
                kicker={lang === 'AR' ? 'نبذة مؤسسية' : 'Corporate Overview'}
                title={lang === 'AR' ? 'تشييد بنية تحتية مستدامة لكبرى مشاريع المملكة' : 'Shaping the Infrastructure Landscape Across the Kingdom'}
                description={lang === 'AR' ? 'تأسست شركة نهضة المملكة في عام 2015 ككيان سعودي رائد للمقاولات العامة والهندسة المدنية والكهروميكانيكية عبر المملكة، ومقرها الرئيسي في جدة بوابة الحرمين الشريفين.' : 'Kingdom Rise Limited was established in 2015 as a full Saudi business entity, serving as a premier heavy civil contractor in the Kingdom of Saudi Arabia. Our corporate headquarters are located in Jeddah, the gateway to the holy cities.'}
              />

              <Reveal delay={0.2}>
                <p className="text-sm text-[#333333] leading-relaxed">
                  {lang === 'AR'
                    ? 'ننفذ باقة واسعة من مشاريع البنية التحتية في القطاعين الحكومي والخاص، بما يشمل تهيئة المواقع، خطوط نقل الطاقة والجهد العالي، والمجمعات الصناعية، وشبكات المياه والأتمتة. نمتلك الكفاءات البشرية والآليات وسنوات الخبرة والقدرة التأمينية لتنفيذ أضخم المشاريع وفق أعلى مقاييس الجودة وفي الوقت المحدد.'
                    : 'We perform a variety of infrastructure projects in both public and private sectors, including site preparation services, high-voltage transmission foundations, commercial buildings, water pipelines, and automated industrial complexes. We possess the people, assets, experience, and bonding capacity to execute any project on time and within allocated resources.'}
                </p>
              </Reveal>

              {/* Pillars checklist */}
              <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <StaggerItem>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span>{t.home.divCivilTitle}</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span>{t.home.divElecTitle}</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span>{t.home.divScadaTitle}</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#00C7AE] shrink-0" />
                    <span>{t.home.divMechTitle}</span>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <Reveal delay={0.3} className="pt-4">
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="group inline-flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-[#0052CC] transition-colors duration-200 cursor-pointer whitespace-nowrap focus:outline-none"
                >
                  <span className="relative">
                    {lang === 'AR' ? 'تعرف على القيادة التنفيذية وتاريخ الشركة' : 'Learn more about leadership & corporate profile'}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-300" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-current transition-transform duration-200 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 shrink-0" />
                </button>
              </Reveal>
            </div>

            {/* Corporate Visual & CEO Message Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Headquarters Architectural Visual */}
              <Reveal variant="scale-up" delay={0.1}>
                <ImageReveal
                  src="/src/assets/images/corporate/kingdom-rise-corporate-headquarters.jpg"
                  alt={lang === 'AR' ? 'المقر الرئيسي لشركة نهضة المملكة - جدة' : 'Kingdom Rise Limited Corporate Headquarters - Jeddah'}
                  badge={lang === 'AR' ? 'المقر الرئيسي · جدة' : 'HEADQUARTERS · JEDDAH'}
                  className="shadow-xl border border-slate-200/80"
                />
              </Reveal>

              <Reveal variant="scale-up" delay={0.15}>
                <div className="bg-[#0B1528] text-white p-7 rounded-xl border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C7AE]/10 rounded-full blur-2xl" />
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <KRCLogo iconOnly size="sm" className="w-7 h-7" />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#00C7AE]">
                        {lang === 'AR' ? 'رسالة الإدارة التنفيذية' : 'Leadership Statement'}
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-sm italic text-slate-200 leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#00C7AE] pl-4 rtl:pl-0 rtl:pr-4">
                    "{lang === 'AR' ? t.about.ceoMessageQuote : COMPANY_PROFILE.ceoMessage.quote}"
                  </blockquote>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    "{lang === 'AR' ? t.about.ceoMessagePara2 : 'Our team embodies the spirit of collaboration and ingenuity. We embrace modern technology and international best practices to ensure our projects are state-of-the-art and environmentally conscious.'}"
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">
                        {lang === 'AR' ? 'الإدارة التنفيذية' : 'Executive Directorate'}
                      </div>
                      <div className="text-xs text-[#00C7AE]">
                        {lang === 'AR' ? 'مجلس الإدارة · شركة نهضة المملكة' : 'Office of the Chief Executive Officer · KRC'}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">KSA · 2015</span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE DIVISIONS & CAPABILITIES */}
      <section className="py-20 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <AnimatedSectionHeading
              kicker={lang === 'AR' ? 'التخصصات الهندسية' : 'Specialized Disciplines'}
              title={t.home.divisionsHeading}
            />
            <button
              onClick={() => navigateTo('services')}
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#0041A3] transition-colors uppercase tracking-wider cursor-pointer self-start md:self-auto"
            >
              <span className="relative">
                {lang === 'AR' ? 'عرض دليل الخدمات الكامل' : 'View Full Service Catalog'}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-300" />
              </span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 text-[#00C7AE] rtl:rotate-180" />
            </button>
          </div>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Division 1: Civil */}
            <StaggerItem>
              <AnimatedCard tilt hoverLift={-5} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between h-full group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src="/src/assets/images/projects/kingdom-rise-makkah-foundations.jpg"
                      alt={t.home.divCivilTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-slate-900/90 text-[#00C7AE] font-mono text-xs font-bold px-2.5 py-1 rounded">
                      {lang === 'AR' ? 'القطاع 01' : 'Division 01'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#333333]">
                      <Building className="w-5 h-5 text-[#0052CC] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105" />
                      <h3 className="text-lg font-bold">{t.home.divCivilTitle}</h3>
                    </div>
                    <p className="text-xs text-[#666666] leading-relaxed mb-4">
                      {t.home.divCivilDesc}
                    </p>
                    <ul className="text-xs text-[#333333] space-y-1.5 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'أساسات وهياكل إنشائية متطورة' : 'Foundations & Structural Steel Works'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'أعمال الحفر والردم والتسوية العميقة' : 'Earthworks, Grading & Deep Excavation'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'رصف الطرق الإسفلتية والبنية التحتية' : 'Road & Highway Asphalt Construction'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => navigateTo('services')}
                    className="w-full py-2.5 text-xs font-bold text-center text-[#0052CC] bg-[#F4F7FA] group-hover:bg-[#EBF2FC] hover:bg-[#EBF2FC] rounded transition-colors border border-slate-200 cursor-pointer"
                  >
                    {lang === 'AR' ? 'استعراض القدرات المدنية' : 'Explore Civil Capabilities'}
                  </button>
                </div>
              </AnimatedCard>
            </StaggerItem>

            {/* Division 2: Electrical */}
            <StaggerItem>
              <AnimatedCard tilt hoverLift={-5} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between h-full group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src="/src/assets/images/services/kingdom-rise-electrical-engineering.jpg"
                      alt={t.home.divElecTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-slate-900/90 text-[#00C7AE] font-mono text-xs font-bold px-2.5 py-1 rounded">
                      {lang === 'AR' ? 'القطاع 02' : 'Division 02'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#333333]">
                      <Zap className="w-5 h-5 text-[#0052CC] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105" />
                      <h3 className="text-lg font-bold">{t.home.divElecTitle}</h3>
                    </div>
                    <p className="text-xs text-[#666666] leading-relaxed mb-4">
                      {t.home.divElecDesc}
                    </p>
                    <ul className="text-xs text-[#333333] space-y-1.5 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'محطات توزيع الجهد العالي والمتوسط' : 'HV/LV Power Distribution & Substations'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'أجهزة القياس ودمج أنظمة SCADA' : 'Instrumentation & SCADA Integration'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'أنظمة إدارة المباني (BMS)' : 'Building Management Systems (BMS)'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => navigateTo('services')}
                    className="w-full py-2.5 text-xs font-bold text-center text-[#0052CC] bg-[#F4F7FA] group-hover:bg-[#EBF2FC] hover:bg-[#EBF2FC] rounded transition-colors border border-slate-200 cursor-pointer"
                  >
                    {lang === 'AR' ? 'استعراض القدرات الكهربائية' : 'Explore Electrical Capabilities'}
                  </button>
                </div>
              </AnimatedCard>
            </StaggerItem>

            {/* Division 3: Mechanical */}
            <StaggerItem>
              <AnimatedCard tilt hoverLift={-5} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between h-full group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src="/src/assets/images/services/kingdom-rise-mechanical-engineering.jpg"
                      alt={t.home.divMechTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-slate-900/90 text-[#00C7AE] font-mono text-xs font-bold px-2.5 py-1 rounded">
                      {lang === 'AR' ? 'القطاع 03' : 'Division 03'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#333333]">
                      <Wrench className="w-5 h-5 text-[#0052CC] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105" />
                      <h3 className="text-lg font-bold">{t.home.divMechTitle}</h3>
                    </div>
                    <p className="text-xs text-[#666666] leading-relaxed mb-4">
                      {t.home.divMechDesc}
                    </p>
                    <ul className="text-xs text-[#333333] space-y-1.5 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'مبردات مركزية ووحدات مناولة الهواء' : 'HVAC Chillers, AHUs & Cleanroom Ducts'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'شبكات إطفاء الحريق والغازات المعتمدة' : 'Fire Hydrant, Sprinkler & Gas Systems'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                        <span>{lang === 'AR' ? 'أنابيب الضغط العالي ومعدات المصانع' : 'Plant Machinery & Pressure Piping'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => navigateTo('services')}
                    className="w-full py-2.5 text-xs font-bold text-center text-[#0052CC] bg-[#F4F7FA] group-hover:bg-[#EBF2FC] hover:bg-[#EBF2FC] rounded transition-colors border border-slate-200 cursor-pointer"
                  >
                    {lang === 'AR' ? 'استعراض القدرات الميكانيكية' : 'Explore Mechanical Capabilities'}
                  </button>
                </div>
              </AnimatedCard>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE WITH FILTER ANIMATION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <AnimatedSectionHeading
              kicker={lang === 'AR' ? 'سجل الإنجازات الميدانية' : 'Proven Track Record'}
              title={t.home.projectsHeading}
              description={t.home.projectsSub}
            />

            {/* Interactive Sector Filter Buttons with layout transitions */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full">
              {[
                { id: 'all', label: t.home.filterAll },
                { id: 'civil', label: t.home.filterCivil },
                { id: 'electrical', label: t.home.filterElec },
                { id: 'mechanical', label: t.home.filterMech },
                { id: 'water & power', label: t.home.filterWater },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setProjectSectorFilter(btn.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap focus:outline-none cursor-pointer ${
                    projectSectorFilter === btn.id
                      ? 'text-white'
                      : 'text-[#666666] hover:text-[#333333]'
                  }`}
                >
                  {projectSectorFilter === btn.id && (
                    <motion.span
                      layoutId="projectFilterActive"
                      className="absolute inset-0 bg-[#0052CC] rounded shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid with AnimatePresence */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: TRANSITIONS.corporateEase }}
                >
                  <AnimatedCard
                    onClick={() => setSelectedProject(project)}
                    tilt
                    hoverLift={-5}
                    className="project-card group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <ImageReveal
                          src={project.featuredImage || (project as any).image || "/src/assets/images/projects/kingdom-rise-aramco-infrastructure.jpg"}
                          alt={project.title}
                          badge={project.year}
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mb-2">
                          <span className="text-[#0052CC] font-semibold">{project.sector}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>

                        <h3 className="project-title text-base font-bold text-[#333333] transition-colors line-clamp-1 mb-2">
                          {project.title}
                        </h3>

                        <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[#333333] pt-3 border-t border-slate-100">
                          <Building2 className="w-3.5 h-3.5 text-[#00C7AE]" />
                          <span className="font-semibold text-[#333333]">{t.common.client}:</span>
                          <span className="truncate">{project.client}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <div className="text-xs font-semibold text-[#0052CC] group-hover:text-[#0041A3] flex items-center justify-between">
                        <span>{t.projects.viewScopeBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#00C7AE] rtl:rotate-180" />
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal delay={0.2} className="mt-12 text-center">
            <AnimatedButton
              onClick={() => navigateTo('projects')}
              variant="secondary"
              icon={<ChevronRight className="w-4 h-4 text-[#00C7AE] rtl:rotate-180" />}
              className="py-3 px-6"
            >
              {t.home.viewAllProjects}
            </AnimatedButton>
          </Reveal>

        </div>
      </section>

      {/* 5. HEAVY EQUIPMENT & PLANT CAPABILITY */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <AnimatedSectionHeading
                theme="dark"
                kicker={lang === 'AR' ? 'الآليات واللوجستيات' : 'Machinery & Logistics'}
                title={t.fleet.overviewHeading}
                description={t.fleet.overviewDesc}
              />

              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-4 text-xs">
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="text-lg font-bold text-white block mb-1 font-mono">
                      {lang === 'AR' ? 'آليات الحفر والردم' : 'Earthmoving'}
                    </span>
                    <p className="text-slate-400">
                      {lang === 'AR' ? 'حفارات هيدروليكية، بلدوزرات، شاحنات بوم، بوبكاتس، ومداحل.' : 'Excavators, bulldozers, boom trucks, JCBs, bobcats, and wheel loaders.'}
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="text-lg font-bold text-white block mb-1 font-mono">
                      {lang === 'AR' ? 'المساحة الدقيقة' : 'Precision Survey'}
                    </span>
                    <p className="text-slate-400">
                      {lang === 'AR' ? 'أجهزة Leica Total Stations، ثيودولايت، وأجهزة ليزر دقيقة.' : 'Leica Total Stations, theodolites, and auto-level laser instruments.'}
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="text-lg font-bold text-white block mb-1 font-mono">
                      {lang === 'AR' ? 'المولدات والورش المتنقلة' : 'Power & Mobile Shop'}
                    </span>
                    <p className="text-slate-400">
                      {lang === 'AR' ? 'مولدات قدرة 220 و 115 ك.ف.أ، ماكينات لحام 400 أمبير، وهزازات خرسانة.' : '220kVA & 115kVA generators, 400A welders, and concrete vibrators.'}
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="text-lg font-bold text-white block mb-1 font-mono">
                      {lang === 'AR' ? 'أسطول النقل اللوجستي' : 'Transportation'}
                    </span>
                    <p className="text-slate-400">
                      {lang === 'AR' ? 'حافلات كوستر 25 راكباً، مركبات دفع رباعي، وشاحنات نقل ثقيل.' : '25-pax Coaster buses, 4x4 pickups, crew cabs, and lowbed trailers.'}
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <div className="pt-2">
                <AnimatedButton
                  onClick={() => navigateTo('fleet')}
                  variant="primary"
                  icon={<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />}
                >
                  {t.fleet.inquireFleetBtn}
                </AnimatedButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="scale-up" delay={0.2}>
                <ImageReveal
                  src="/src/assets/images/fleet/kingdom-rise-heavy-equipment-fleet.jpg"
                  alt={t.fleet.pageTitle}
                  badge={lang === 'AR' ? 'أسطول معتمد 270+ آلية' : '270+ FLEET UNITS READY'}
                  className="shadow-2xl border border-slate-800"
                >
                  <div className="bg-slate-950/85 backdrop-blur-sm p-4 rounded-lg border border-slate-800 text-xs mt-auto">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white uppercase tracking-wider">
                        {lang === 'AR' ? 'جاهزية الأسطول' : 'Fleet Reliability'}
                      </span>
                      <span className="text-[#00C7AE] font-mono font-bold">2018+ Standard</span>
                    </div>
                    <p className="text-slate-400">
                      {lang === 'AR' ? 'برامج صيانة وقائية دورية ومعايرة معتمدة من جهات تفتيش مستقلة.' : 'Comprehensive preventative maintenance schedules and certified third-party calibrations.'}
                    </p>
                  </div>
                </ImageReveal>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 6. KEY CLIENTS STRIP WITH STAGGER REVEAL */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              {t.home.clientsHeading}
            </div>
          </Reveal>
          
          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {[
              lang === 'AR' ? "أرامكو السعودية" : "Saudi Aramco",
              lang === 'AR' ? "وزارة الدفاع" : "Ministry of Defense",
              lang === 'AR' ? "الشركة السعودية للكهرباء" : "SEC - Saudi Electricity",
              lang === 'AR' ? "تحلية المياه (SWCC)" : "SWCC Desalination",
              lang === 'AR' ? "مرافق الجبيل" : "MARAFIQ Jubail",
              lang === 'AR' ? "الخطوط السعودية للشحن" : "Saudi Airlines Cargo",
              lang === 'AR' ? "إفكو السعودية" : "IFFCO Saudi Arabia",
            ].map((client, idx) => (
              <StaggerItem key={idx}>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-bold text-[#333333] hover:text-[#0052CC] hover:bg-[#EBF2FC] hover:border-[#0052CC]/40 transition-colors shadow-xs">
                  {client}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. WHY CHOOSE US & SAFETY CULTURE */}
      <section className="py-20 bg-[#F4F7FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <AnimatedSectionHeading
              align="center"
              kicker={lang === 'AR' ? 'عوامل التميز والمنافسة' : 'Competitive Advantages'}
              title={t.home.whyHeading}
              description={t.home.whySub}
            />
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: t.home.whyItem1Title, desc: t.home.whyItem1Desc },
              { title: t.home.whyItem2Title, desc: t.home.whyItem2Desc },
              { title: t.home.whyItem3Title, desc: t.home.whyItem3Desc },
              { title: t.home.whyItem4Title, desc: t.home.whyItem4Desc },
            ].map((adv, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard hoverLift={-4} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 h-full">
                  <div className="w-8 h-8 rounded bg-[#EBF2FC] text-[#0052CC] flex items-center justify-center font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#333333]">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {adv.desc}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Safety & Quality Highlight Banner with Real Profile Image */}
          <Reveal variant="scale-up" delay={0.1}>
            <div className="bg-gradient-to-r from-[#0B1528] to-[#060D1A] text-white rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00C7AE]">
                    <ShieldCheck className="w-4 h-4 text-[#00C7AE]" />
                    <span>{lang === 'AR' ? 'إدارة السلامة والصحة المهنية ومنع الخسائر' : 'Safety & Loss Prevention Department'}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {lang === 'AR' ? 'ثقافة وقائية تستهدف صفر حوادث في كافة المواقع' : 'Proactive Zero Accident Culture Across All Worksites'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'AR'
                      ? 'السلامة ليست مجرد أولوية، بل هي قيمة جوهرية لا مساومة عليها. يضمن برنامج الوقاية من الحوادث لدينا الالتزام بنسبة 100% بمعدات الوقاية، وتدريب العاملين الجدد، واجتماعات السلامة الأسبوعية وتدقيق متواصل من 10 مشرفي سلامة متفرغين.'
                      : 'Safety is not just a priority—it is a core value. Our written Accident Prevention Program guarantees 100% PPE compliance, mandatory 15-minute new hire orientations, weekly toolbox talks, and continuous site auditing by 10 full-time safety supervisors.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#00C7AE]" />
                      <span>{lang === 'AR' ? 'صفر حوادث وقت ضائع (0 LTI)' : '0 LTI Target Maintained'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#00C7AE]" />
                      <span>{lang === 'AR' ? '98% نسبة امتثال التدقيق' : '98% Safety Audit Compliance'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#00C7AE]" />
                      <span>{lang === 'AR' ? 'شهادات اعتماد السقالات والعمل على ارتفاعات' : 'Scaffolding & Work-at-Height Certified'}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <AnimatedButton
                      onClick={() => navigateTo('about')}
                      variant="primary"
                    >
                      {lang === 'AR' ? 'دليل الجودة والسلامة' : 'Review Safety & QA Manual'}
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => navigateTo('contact')}
                      variant="secondary"
                    >
                      {lang === 'AR' ? 'التواصل مع إدارة السلامة' : 'Contact Safety Directorate'}
                    </AnimatedButton>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <ImageReveal
                    src="/src/assets/images/safety/kingdom-rise-safety-quality.jpg"
                    alt={lang === 'AR' ? 'معايير السلامة والجودة في مواقع العمل' : 'Kingdom Rise Certified Site Safety & Quality Inspection'}
                    badge={lang === 'AR' ? 'صفر حوادث · 100% وقاية' : '0 LTI · 100% PPE COMPLIANT'}
                    className="shadow-2xl border border-slate-700/80"
                  />
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 8. TECHNOLOGY & INNOVATION (BIM, REVIT, PRIMAVERA P6, SCADA) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-900 to-slate-900 pointer-events-none" />
        
        {/* Subtle Engineering Blueprint Background Grid & Laser Scan Line */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 199, 174, 0.4)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
          </svg>
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C7AE] to-transparent opacity-40"
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <AnimatedSectionHeading
                theme="dark"
                kicker={lang === 'AR' ? 'الهندسة الرقمية والابتكار' : 'Technology & Innovation'}
                title={lang === 'AR' ? 'تكنولوجيا نمذجة معلومات البناء (BIM) وإدارة المشاريع الرقمية' : 'Digital Engineering, BIM Coordination & Intelligent Control'}
                description={lang === 'AR' ? 'نوظف أحدث المنظومات الهندسية والبرمجيات المتقدمة لضمان دقة التنفيذ وكشف التعارضات قبل بدء الأعمال الميدانية، مما يوفر الوقت والتكاليف لعملائنا.' : 'We deploy advanced engineering software suites and real-time project telemetry to eliminate site clashes, accelerate delivery schedules, and optimize lifecycle facility performance.'}
              />

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'BIM 3D Modeling', desc: lang === 'AR' ? 'كشف التعارضات والتنسيق ثلاثي الأبعاد' : 'Clash detection & 3D spatial coordination' },
                  { name: 'AutoCAD & Revit', desc: lang === 'AR' ? 'مخططات تنفيذية معمارية وكهروميكانيكية' : 'Architectural & MEP shop drawing detailing' },
                  { name: 'Primavera P6', desc: lang === 'AR' ? 'جدولة ومسار حرج للمشاريع الكبرى' : 'Critical path scheduling & resource management' },
                  { name: 'SCADA & IoT', desc: lang === 'AR' ? 'مراقبة تحكم صناعي واستشعار عن بعد' : 'Supervisory control & telemetry integration' },
                ].map((tech, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2, borderColor: 'rgba(0, 199, 174, 0.45)' }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80 transition-colors shadow-xs"
                  >
                    <span className="font-bold text-[#00C7AE] block mb-1 font-mono text-[11px]">{tech.name}</span>
                    <span className="text-slate-300 text-[11px]">{tech.desc}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2">
                <AnimatedButton
                  onClick={() => navigateTo('services')}
                  variant="primary"
                  icon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
                >
                  {lang === 'AR' ? 'استكشاف الحلول الهندسية المتطورة' : 'Explore Advanced Solutions'}
                </AnimatedButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="scale-up" delay={0.2}>
                <ImageReveal
                  src="/src/assets/images/technology/kingdom-rise-technology-bim.jpg"
                  alt={lang === 'AR' ? 'منظومة BIM والهندسة الرقمية' : 'Kingdom Rise Digital BIM & Engineering Technology Suite'}
                  badge="DIGITAL TWIN · BIM 3D"
                  className="shadow-2xl border border-slate-700/80"
                />
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 9. SUSTAINABILITY & ENVIRONMENTAL STEWARDSHIP */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal variant="scale-up" delay={0.15}>
                <ImageReveal
                  src="/src/assets/images/technology/kingdom-rise-sustainability.jpg"
                  alt={lang === 'AR' ? 'الاستدامة والطاقة المتجددة' : 'Kingdom Rise Sustainable Construction & Solar Energy Infrastructure'}
                  badge="VISION 2030 SUSTAINABILITY"
                  className="shadow-xl border border-slate-200"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <AnimatedSectionHeading
                kicker={lang === 'AR' ? 'الاستدامة والبيئة' : 'Sustainability & Stewardship'}
                title={lang === 'AR' ? 'ممارسات بناء مستدامة تدعم مستهدفات رؤية 2030' : 'Building a Sustainable Future in Alignment with Saudi Vision 2030'}
                description={lang === 'AR' ? 'نلتزم بتطبيق ممارسات البناء الأخضر وترشيد استهلاك الطاقة وتكامل حلول الطاقة الشمسية الكهروضوئية وإدارة المخلفات الإنشائية لحماية البيئة.' : 'Kingdom Rise integrates eco-friendly construction techniques, photovoltaic solar installations, energy-efficient building automation, and responsible site waste management.'}
              />

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <Leaf className="w-4 h-4 text-[#00C7AE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-xs mb-0.5">{lang === 'AR' ? 'كفاءة الطاقة وأنظمة الطاقة المتجددة' : 'Renewable Solar & Energy Optimization'}</strong>
                    <span>{lang === 'AR' ? 'تنفيذ محطات الطاقة الشمسية ودمجها مع شبكات الجهد العالي والمتوسط.' : 'Turnkey rooftop & ground solar array installations coupled with HV/LV substations.'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <Building className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-xs mb-0.5">{lang === 'AR' ? 'إدارة المباني الذكية (Smart BMS)' : 'Intelligent Smart Building Automation'}</strong>
                    <span>{lang === 'AR' ? 'أنظمة تحكم متطورة تقلل استهلاك التكييف والإضاءة بنسب تصل إلى 30%.' : 'Precision climate and lighting controls reducing facility lifecycle energy consumption.'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <AnimatedButton
                  onClick={() => navigateTo('about')}
                  variant="secondary"
                  icon={<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />}
                >
                  {lang === 'AR' ? 'المزيد عن سياسة الاستدامة' : 'Learn About Our ESG Commitment'}
                </AnimatedButton>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS CAROUSEL */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0052CC]/10 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <AnimatedSectionHeading
                theme="dark"
                align="center"
                kicker={lang === 'AR' ? 'شهادات معتمدة' : 'Verified References'}
                title={t.home.testimonialsHeading}
                description={t.home.testimonialsSub}
              />
            </div>

            <Reveal variant="scale-up" delay={0.15}>
              <TestimonialCarousel testimonials={testimonials} />
            </Reveal>
          </div>
        </section>
      )}

      {/* 9. CONVERSION CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-b from-[#0B1528] to-[#040810] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-[#00C7AE]">
              {lang === 'AR' ? 'المناقصات وتطوير الأعمال' : 'Tendering & Business Development'}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white text-balance leading-tight">
              {t.home.ctaBannerHeading}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.home.ctaBannerSub}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton
              onClick={() => navigateTo('quote')}
              variant="secondary"
              icon={<ChevronRight className="w-4 h-4 text-[#00C7AE] rtl:rotate-180" />}
              className="py-3.5 px-8"
            >
              {t.home.ctaBannerBtnQuote}
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigateTo('contact')}
              variant="secondary"
              icon={<ChevronRight className="w-4 h-4 text-[#00C7AE] rtl:rotate-180" />}
              className="py-3.5 px-8"
            >
              {t.home.ctaBannerBtnContact}
            </AnimatedButton>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
