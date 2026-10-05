import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_PROFILE } from '../data/companyData';
import { KRCLogo } from './KRCLogo';
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, lang, t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Corporate Profile with 3D Logo and original text */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <KRCLogo iconOnly size="sm" className="w-8 h-8" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                {lang === 'AR' ? 'شركة نهضة المملكة المحدودة' : 'KINGDOM RISE LIMITED'}
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400">
              {t.footer.companyBio}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00C7AE] block mb-2">
                {t.footer.registrationsTitle}
              </span>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C7AE] shrink-0" />
                  <span>{t.footer.crLabel}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C7AE] shrink-0" />
                  <span>{t.footer.chamberLabel}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C7AE] shrink-0" />
                  <span>{t.footer.vatLabel}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 2: Engineering Divisions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#00C7AE] pl-2 rtl:pl-0 rtl:pr-2">
              {t.footer.coreDivisionsTitle}
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.civil}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.electrical}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.mechanical}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.scada}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('fleet')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.fleet}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('why-choose-us')}
                  className="hover:text-[#00C7AE] transition-colors text-left rtl:text-right"
                >
                  {t.footer.divisions.quality}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Client Relationships & Banking */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#00C7AE] pl-2 rtl:pl-0 rtl:pr-2">
              {lang === 'AR' ? 'العملاء والشركاء الماليون' : 'Partners & Clients'}
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              {lang === 'AR' 
                ? 'مقاول موثوق لأبرز الصروح والمؤسسات الوطنية في المملكة:' 
                : 'Trusted contractor for strategic Saudi national enterprises:'}
            </p>
            <div className="text-xs text-slate-300 space-y-1 mb-5">
              <div>{lang === 'AR' ? 'أرامكو السعودية · وزارة الدفاع' : 'Saudi Aramco · Ministry of Defense (MOD)'}</div>
              <div>{lang === 'AR' ? 'الشركة السعودية للكهرباء · تحلية المياه · مرافق' : 'SEC (Saudi Electricity) · SWCC · MARAFIQ'}</div>
              <div>{lang === 'AR' ? 'الخطوط السعودية للشحن · مطار المدينة · إفكو' : 'Saudi Airlines Cargo · Madina Airport · IFFCO'}</div>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#00C7AE]" />
                {lang === 'AR' ? 'الشركاء المصرفيون المعتمدون' : 'Corporate Banking Partners'}
              </span>
              <div className="text-xs text-slate-400 space-y-1">
                <div>{lang === 'AR' ? 'البنك الأهلي السعودي (SNB)' : 'SNB - Saudi National Bank'}</div>
                <div>{lang === 'AR' ? 'مصرف الراجحي' : 'Al Rajhi Bank'}</div>
              </div>
            </div>
          </div>

          {/* Col 4: Corporate Headquarters & Quick Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#00C7AE] pl-2 rtl:pl-0 rtl:pr-2">
              {t.footer.headquartersTitle}
            </h4>
            <div className="text-xs space-y-3 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C7AE] shrink-0 mt-0.5" />
                <span>
                  {t.footer.jeddahOffice}
                  <br />
                  <span className="text-slate-500">{t.footer.jeddahAddress}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00C7AE] shrink-0" />
                <a href="tel:+966562997929" className="hover:text-white transition-colors font-mono">
                  +966 56 299 7929
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00C7AE] shrink-0" />
                <a href="mailto:info@kingdomrise.com" className="hover:text-white transition-colors">
                  {t.footer.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#00C7AE] shrink-0" />
                <span>www.kingdomrise.com</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('quote')}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold tracking-wide uppercase text-white bg-[#0052CC] hover:bg-[#0041A3] rounded transition-all cursor-pointer"
            >
              <span>{t.nav.requestQuote}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00C7AE] rtl:rotate-180" />
            </button>
          </div>

        </div>

        {/* Vision 2030 Bar & Copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="text-[#00C7AE] font-bold tracking-wider">
              {lang === 'AR' ? 'رؤية السعودية 2030' : 'SAUDI VISION 2030'}
            </span>
            <span>·</span>
            <span>{t.footer.vision2030Banner}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2015-{new Date().getFullYear()} {t.footer.copyright}</span>
            <button
              onClick={() => navigateTo('admin/login')}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              {t.nav.adminPortal}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
