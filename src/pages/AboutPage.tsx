import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COMPANY_PROFILE, DEPARTMENTS } from '../data/companyData';
import { KRCLogo } from '../components/KRCLogo';
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
  ShieldCheck,
  Award,
  Users,
  Building,
  Target,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Landmark,
  FileCheck,
  Activity,
  Layers,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, lang, t } = useApp();
  const [expandedDept, setExpandedDept] = useState<string>('ops');

  return (
    <div className="bg-[#F4F7FA] text-[#333333]">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>{lang === 'AR' ? 'الملف المؤسسي · شركة نهضة المملكة' : 'Chapter 01 · Corporate Profile'}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {t.about.pageTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                {t.about.pageSubtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Company Overview & Strategic Location */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <AnimatedSectionHeading
                kicker={lang === 'AR' ? 'الأصالة والمكانة' : 'Heritage & Standing'}
                title={t.about.executiveSummaryTitle}
                description={t.about.executiveSummaryText1}
              />

              <Reveal delay={0.15}>
                <p className="text-sm text-[#333333] leading-relaxed">
                  {t.about.executiveSummaryText2}
                </p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div className="p-4 rounded-xl bg-[#EBF2FC] border border-[#0052CC]/20 text-xs text-[#002D70] font-medium leading-relaxed">
                  "{lang === 'AR' 
                    ? 'نمتلك الكفاءات البشرية والآليات وسنوات الخبرة والقدرة المالية والتأمينية لإنجاز أي مشروع في الموعد المحدد وضمن الميزانية المعتمدة.'
                    : 'We have the people, assets, experience, and bonding capacity to complete any size of project ON TIME and within the allocated resources.'}"
                </div>
              </Reveal>

              <StaggerContainer staggerDelay={0.07} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <StaggerItem>
                  <div className="p-4 bg-[#F4F7FA] border border-slate-200 rounded-xl text-center">
                    <span className="block text-2xl font-bold text-[#0052CC] font-mono">
                      <AnimatedCounter value="2015" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase">
                      {lang === 'AR' ? 'سنة التأسيس' : 'Established'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 bg-[#F4F7FA] border border-slate-200 rounded-xl text-center">
                    <span className="block text-2xl font-bold text-[#0052CC] font-mono">
                      <AnimatedCounter value="53+" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase">
                      {lang === 'AR' ? 'مشاريع كبرى' : 'Major Projects'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 bg-[#F4F7FA] border border-slate-200 rounded-xl text-center">
                    <span className="block text-2xl font-bold text-[#0052CC] font-mono">
                      <AnimatedCounter value="100%" />
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase">
                      {lang === 'AR' ? 'أسطول مملوك' : 'Owned Fleet'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 bg-[#F4F7FA] border border-slate-200 rounded-xl text-center">
                    <span className="block text-2xl font-bold text-[#00C7AE] font-mono">0 LTI</span>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase">
                      {lang === 'AR' ? 'سجل السلامة' : 'Safety Target'}
                    </span>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Reveal variant="scale-up" delay={0.15}>
                <ImageReveal
                  src="/src/assets/images/corporate/kingdom-rise-corporate-headquarters.jpg"
                  alt={lang === 'AR' ? 'المقر الإداري والهندسي لشركة نهضة المملكة - جدة' : 'Kingdom Rise Limited Executive Boardroom & Jeddah Corporate Headquarters'}
                  badge={lang === 'AR' ? 'المقر الرئيسي · جدة' : 'CORPORATE HEADQUARTERS · JEDDAH'}
                  className="shadow-xl border border-slate-200"
                />
              </Reveal>

              <Reveal variant="scale-up" delay={0.2}>
                <div className="bg-[#0B1528] text-white rounded-2xl p-7 border border-slate-800 space-y-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0052CC] text-white flex items-center justify-center font-bold text-xs font-mono shadow-md">
                      HQ
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        {t.footer.jeddahOffice}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {lang === 'AR' ? 'المملكة العربية السعودية · بوابة الحرمين' : 'Kingdom of Saudi Arabia'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'AR'
                      ? 'انطلاقاً من موقعنا الاستراتيجي على ساحل البحر الأحمر في مدينة جدة، تدير شركة نهضة المملكة عمليات تعبئة ولوجستيات فورية لكافة المشاريع في مكة المكرمة، المدينة المنورة، رابغ، ينبع، الرياض، الجبيل، ومناطق تطوير نيوم.'
                      : 'Positioned strategically along the Red Sea corridor in Jeddah, Kingdom Rise Limited coordinates fast-mobilization logistics to Makkah, Madinah, Rabigh, Yanbu, Riyadh, Jubail, and Neom development zones.'}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400">{t.footer.crLabel}</span>
                      <span className="text-[#00C7AE] font-medium">{lang === 'AR' ? 'سارٍ ومكتمل' : 'Fully Verified'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400">{t.footer.chamberLabel}</span>
                      <span className="text-[#00C7AE] font-medium">{lang === 'AR' ? 'عضو معتمد' : 'Jeddah Member'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400">{t.footer.vatLabel}</span>
                      <span className="text-[#00C7AE] font-medium">{lang === 'AR' ? 'متوافق مع ZATCA' : 'ZATCA Compliant'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">{lang === 'AR' ? 'البنوك المعتمدة' : 'Primary Banking'}</span>
                      <span className="text-white font-medium">{lang === 'AR' ? 'الأهلي والراجحي' : 'SNB & Al Rajhi Bank'}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-20 bg-[#F4F7FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <Reveal variant="scale-up" delay={0.1}>
              <AnimatedCard tilt glow hoverLift={-4} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF2FC] text-[#0052CC] flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] uppercase tracking-wider">
                    {t.about.visionTitle}
                  </h3>
                </div>
                <p className="text-sm text-[#333333] leading-relaxed font-medium">
                  {t.about.visionDesc}
                </p>
                <p className="text-xs text-[#888888] leading-relaxed pt-2 border-t border-slate-100">
                  {lang === 'AR'
                    ? 'دفع مسيرة الابتكار في البنية التحتية بما يواكب مستهدفات رؤية السعودية 2030 في المناطق الغربية والوسطى والشرقية.'
                    : 'Driving infrastructure innovation in alignment with the goals of Saudi Vision 2030 across the Western, Central, and Eastern provinces.'}
                </p>
              </AnimatedCard>
            </Reveal>

            {/* Mission */}
            <Reveal variant="scale-up" delay={0.2}>
              <AnimatedCard tilt glow hoverLift={-4} className="bg-[#0B1528] text-white rounded-2xl p-8 border border-slate-800 space-y-4 shadow-xl h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#00C7AE] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {t.about.missionTitle}
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {t.about.missionDesc}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <span className="font-bold text-white block text-[11px]">
                      {lang === 'AR' ? 'الجودة والإتقان' : 'Quality Excellence'}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {lang === 'AR' ? 'متانة ودقة في التفاصيل' : 'Durability & precision'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <span className="font-bold text-[#00C7AE] block text-[11px]">
                      {lang === 'AR' ? 'السلامة أولاً' : 'Safety First'}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {lang === 'AR' ? 'ثقافة 0 حوادث LTI' : '0 LTI Target culture'}
                    </span>
                  </div>
                </div>
              </AnimatedCard>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <AnimatedSectionHeading
              align="center"
              kicker={lang === 'AR' ? 'ثوابتنا ومبادئنا' : 'What We Stand For'}
              title={t.about.valuesTitle}
              description={t.about.valuesSub}
            />
          </div>

          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t.about.values.honesty,
              t.about.values.integrity,
              t.about.values.fairness,
              t.about.values.accountability,
              t.about.values.consideration,
              t.about.values.excellence,
              t.about.values.reliability,
              t.about.values.citizenship,
            ].map((val, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard hoverLift={-4} className="bg-[#F4F7FA] p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#0052CC] text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#333333]">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {val.desc}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* 5. Corporate Organizational Structure & Interactive Accordion */}
      <section className="py-20 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <AnimatedSectionHeading
              align="center"
              kicker={lang === 'AR' ? 'الحوكمة المؤسسية' : 'Corporate Governance'}
              title={lang === 'AR' ? 'الهيكل التنظيمي والإطار التشغيلي' : 'Organizational Structure & Operational Framework'}
              description={lang === 'AR' ? 'تسلسل إداري واضح يضمن سرعة اتخاذ القرارات والمسؤولية المباشرة في كافة الأقسام.' : 'Clear reporting lines ensure efficient decision-making and accountability across all 8 departments.'}
            />
          </div>

          {/* Top CEO Level */}
          <Reveal delay={0.1} className="flex justify-center">
            <div className="w-full max-w-md bg-[#0B1528] text-white text-center p-5 rounded-2xl border border-slate-800 shadow-lg">
              <span className="text-[11px] uppercase tracking-widest text-[#00C7AE] font-semibold block mb-1">
                {lang === 'AR' ? 'القيادة التنفيذية العليا' : 'Executive Leadership'}
              </span>
              <div className="text-lg font-extrabold tracking-tight">
                {lang === 'AR' ? 'الرئيس التنفيذي والعضو المنتدب' : 'CHIEF EXECUTIVE OFFICER'}
              </div>
              <span className="text-xs text-slate-400">
                {lang === 'AR' ? 'مجلس إدارة شركة نهضة المملكة' : 'Kingdom Rise Limited Board & Directorate'}
              </span>
            </div>
          </Reveal>

          {/* Department Tabs & Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Department List */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                {lang === 'AR' ? 'الأقسام التشغيلية' : 'Operational Departments'}
              </span>
              {DEPARTMENTS.map((dept) => {
                const isSelected = expandedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setExpandedDept(dept.id)}
                    className={`w-full text-left rtl:text-right p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'bg-[#0052CC] text-white border-[#0052CC]'
                        : 'bg-white text-[#333333] border-slate-200 hover:bg-[#F4F7FA]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${isSelected ? 'text-[#00C7AE]' : 'text-[#0052CC]'}`}>{dept.deptNumber}</span>
                      <span>{dept.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-180 text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Department Details Card with AnimatePresence */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {(() => {
                  const currentDept = DEPARTMENTS.find(d => d.id === expandedDept) || DEPARTMENTS[0];
                  return (
                    <motion.div
                      key={currentDept.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: TRANSITIONS.corporateEase }}
                      className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0052CC] mb-1">
                          <span>{lang === 'AR' ? `القسم ${currentDept.deptNumber}` : `DEPARTMENT ${currentDept.deptNumber}`}</span>
                          <span>·</span>
                          <span>{currentDept.managerTitle}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#333333]">
                          {currentDept.title}
                        </h3>
                        <p className="text-xs text-[#666666] leading-relaxed mt-2">
                          {currentDept.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-3">
                            {lang === 'AR' ? 'المسؤوليات الرئيسية' : 'Primary Responsibilities'}
                          </h4>
                          <ul className="text-xs text-[#666666] space-y-2">
                            {currentDept.primaryResponsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C7AE] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-2">
                              {lang === 'AR' ? 'مجالات التركيز الأساسية' : 'Key Focus Areas'}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {currentDept.keyFocusAreas.map((focus, i) => (
                                <span key={i} className="text-xs font-medium bg-[#F4F7FA] px-2.5 py-1 rounded-lg border border-slate-200 text-[#333333]">
                                  {focus}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-2">
                              {lang === 'AR' ? 'تشكيل الفريق' : 'Team Composition'}
                            </h4>
                            <ul className="text-xs text-[#666666] space-y-1">
                              {currentDept.teamComposition.map((m, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C7AE]" />
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Workforce & Engineering Software */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <AnimatedSectionHeading
                theme="dark"
                kicker={lang === 'AR' ? 'الكوادر المتميزة' : 'Skilled Talent'}
                title={lang === 'AR' ? 'الفريق الهندسي والكوادر الميدانية' : 'Engineering & Field Workforce'}
                description={lang === 'AR' ? 'توظف شركة نهضة المملكة نخبة من المهندسين المدنيين والكهربائيين والميكانيكيين المعتمدين، وخبراء الجودة والسلامة ومساحين مرخصين بمتوسط خبرة يتجاوز 8 سنوات في بيئة العمل السعودية.' : 'Kingdom Rise Limited employs strong talents including certified civil, electrical, and mechanical engineers, QA/QC specialists, licensed surveyors, and skilled craftsmen. With an average of 8+ years of dedicated regional experience, our team drives on-site efficiency and zero-accident compliance.'}
              />

              <StaggerContainer staggerDelay={0.07} className="grid grid-cols-2 gap-4 text-xs">
                <StaggerItem>
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="font-bold text-white block">
                      {lang === 'AR' ? 'الفريق الهندسي' : 'Engineering Team'}
                    </span>
                    <span className="text-slate-400">
                      {lang === 'AR' ? 'مهندسو إنشاءات، قوى، ميكانيكا وأجهزة قياس' : 'Civil, Electrical, Mechanical & Instrumentation Engineers'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="font-bold text-white block">
                      {lang === 'AR' ? 'مشرفو السلامة (HSE)' : 'HSE Supervisors'}
                    </span>
                    <span className="text-slate-400">
                      {lang === 'AR' ? '10 أخصائيي سلامة متفرغين في المواقع' : '10 full-time site safety specialists'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="font-bold text-white block">
                      {lang === 'AR' ? 'الحرفيون الفنيون' : 'Technical Crafts'}
                    </span>
                    <span className="text-slate-400">
                      {lang === 'AR' ? 'لحامون معتمدون وفق ASME وفنيو أنابيب وحدادون' : 'Certified ASME welders, pipe fitters, steel fixers & masons'}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="font-bold text-white block">
                      {lang === 'AR' ? 'مشغلو الآليات' : 'Plant Operators'}
                    </span>
                    <span className="text-slate-400">
                      {lang === 'AR' ? 'سائقو رافعات ومعدات ثقيلة مرخصون' : 'Certified heavy machinery and crane drivers'}
                    </span>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="scale-up" delay={0.2}>
                <div className="bg-slate-800/90 rounded-2xl p-8 border border-slate-700 space-y-5 shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#00C7AE] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>{lang === 'AR' ? 'البرمجيات الهندسية والمعايير الرقمية' : 'Engineering Software & Technology Standards'}</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'AR'
                      ? 'تعتمد إدارات التقديرات والتخطيط لدينا على أحدث حزم برمجيات التصميم الهندسي ونمذجة معلومات المباني (BIM) وإدارة المشاريع:'
                      : 'Our Tendering and Planning departments utilize industry standard CAD, BIM, and critical path scheduling software:'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {COMPANY_PROFILE.softwareTools.map((sw, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C7AE] shrink-0" />
                        <span>{sw}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <AnimatedButton
                      onClick={() => navigateTo('quote')}
                      variant="secondary"
                      icon={<ChevronRight className="w-4 h-4 text-[#00C7AE] rtl:rotate-180" />}
                      className="w-full text-center"
                    >
                      {lang === 'AR' ? 'تقديم كراسة الشروط والمناقصة' : 'Submit RFP to Technical Directorate'}
                    </AnimatedButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Real On-Site Construction & Civil Execution Showcase */}
          <div className="pt-8 border-t border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#00C7AE] font-semibold block mb-1">
                  {lang === 'AR' ? 'سجلات التنفيذ الميداني' : 'Field Engineering Records'}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'AR' ? 'عمليات البناء والتشييد الميدانية عبر المملكة' : 'On-Site Construction & Civil Execution Across Saudi Arabia'}
                </h3>
              </div>
              <button
                onClick={() => navigateTo('projects')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C7AE] hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
              >
                <span>{lang === 'AR' ? 'استعراض كافة المشاريع' : 'Explore All Project Dossiers'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal variant="scale-up" delay={0.1}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-makkah-foundations.jpg"
                  alt="Makkah Principality Transmission Tower Stub Foundations & Continuous Concrete Raft Pouring"
                  badge={lang === 'AR' ? 'مكة المكرمة · صب الأساسات' : 'MAKKAH PROVINCE · FOUNDATIONS'}
                  className="rounded-2xl border border-slate-800 shadow-xl"
                />
              </Reveal>
              <Reveal variant="scale-up" delay={0.15}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-tabuk-earthwork.jpg"
                  alt="Tabuk & Buqaylah Mountain Highway Earthworks"
                  badge={lang === 'AR' ? 'تبوك وبقيلاء · تكسير الصخور' : 'TABUK REGION · ROCK EXCAVATION'}
                  className="rounded-2xl border border-slate-800 shadow-xl"
                />
              </Reveal>
              <Reveal variant="scale-up" delay={0.2}>
                <ImageReveal
                  src="/src/assets/images/projects/kingdom-rise-culvert-infrastructure.jpg"
                  alt="Strategic Stormwater Precast Concrete Box Culvert Installation"
                  badge={lang === 'AR' ? 'المنطقة الغربية · تصريف السيول' : 'WESTERN PROVINCE · BOX CULVERTS'}
                  className="rounded-2xl border border-slate-800 shadow-xl"
                />
              </Reveal>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
