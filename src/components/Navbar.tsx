import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { KRCLogo } from './KRCLogo';
import { Menu, X, Shield, ArrowUpRight, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { TRANSITIONS } from './motion/MotionConfig';

export const Navbar: React.FC = () => {
  const { activePage, navigateTo, lang, setLang, t, openTenderModal } = useApp();
  const { isAuthenticated, adminProfile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & body scroll management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'fleet', label: t.nav.fleet },
    { id: 'why-choose-us', label: t.nav.whyUs },
    { id: 'insights', label: t.nav.insights },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNav = (id: string) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* 1. TOP UTILITY STRIP (Front Bar Top Strip) - Crisp Corporate Accreditation & Quick Contacts */}
      <div className="bg-[#060D1A] border-b border-slate-800/80 text-slate-300 text-[11px] font-medium hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          {/* Left: CR License & Regional Presence */}
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-[#00C7AE] shrink-0" />
              <span>{lang === 'AR' ? 'س.ت: 4030286884' : 'CR: 4030286884'}</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="truncate">
              {lang === 'AR' ? 'المقر الرئيسي: جدة والرياض · المملكة العربية السعودية' : 'Headquarters: Jeddah & Riyadh, Saudi Arabia'}
            </span>
          </div>

          {/* Right: Direct Contacts, Tenders, Language Switcher */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+966562997929"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#00C7AE] transition-colors"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-[#00C7AE]" />
              <span className="font-mono text-[11px]">+966 56 299 7929</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="mailto:info@kingdomrise.com"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#00C7AE] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#00C7AE]" />
              <span className="font-mono text-[11px]">info@kingdomrise.com</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => openTenderModal()}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3 text-[#00C7AE]" />
              <span>{t.nav.tenders}</span>
            </button>
            <span className="text-slate-700">|</span>
            {/* Clean Flat Language Toggle Pill */}
            <div className="inline-flex items-center bg-slate-900 rounded border border-slate-800 p-0.5" role="group">
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                  lang === 'EN'
                    ? 'bg-[#0052CC] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('AR')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                  lang === 'AR'
                    ? 'bg-[#0052CC] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="العربية"
              >
                عربي
              </button>
            </div>

            {/* Admin Portal discrete button */}
            <button
              onClick={() => handleNav(isAuthenticated ? 'admin/dashboard' : 'admin/login')}
              className={`p-1 rounded text-slate-400 hover:text-[#00C7AE] transition-colors cursor-pointer ${
                isAuthenticated ? 'text-[#00C7AE]' : ''
              }`}
              title={isAuthenticated ? `Active Admin: ${adminProfile?.adminId}` : 'Admin Portal'}
              aria-label="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-slate-800/80 py-2.5 sm:py-3'
            : 'bg-slate-950/90 backdrop-blur-md border-slate-800/50 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Zone 1: Brand Wordmark & Emblem */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left rtl:text-right group focus:outline-none cursor-pointer shrink-0"
              aria-label={lang === 'AR' ? 'شركة نهضة المملكة المحدودة' : 'Kingdom Rise Limited Home'}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                <KRCLogo iconOnly size="md" className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold tracking-tight text-white text-sm sm:text-base md:text-lg block leading-tight transition-colors group-hover:text-[#00C7AE] truncate max-w-[170px] xs:max-w-[210px] sm:max-w-none">
                  {lang === 'AR' ? 'شركة نهضة المملكة المحدودة' : 'KINGDOM RISE LIMITED'}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#00C7AE] font-semibold uppercase block mt-0.5 truncate">
                  {lang === 'AR' ? 'المملكة العربية السعودية · مقاولات عامة' : 'General Contracting · Saudi Arabia'}
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`text-xs xl:text-sm font-medium transition-colors relative py-1 px-1 focus:outline-none whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#00C7AE] font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0052CC] to-[#00C7AE] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Desktop CTA Action (Standard Button Styling, No Blue Down-Shadow) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNav('quote')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide uppercase text-white bg-[#0052CC] hover:bg-[#0041A3] active:bg-[#002D70] rounded-lg shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#00C7AE] focus:ring-offset-2 focus:ring-offset-slate-950 whitespace-nowrap cursor-pointer"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00C7AE]" />
              </button>
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Quick Quote CTA for Tablets */}
              <button
                onClick={() => handleNav('quote')}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] active:bg-[#002D70] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>{t.nav.requestQuote}</span>
              </button>

              {/* Quick Lang Switcher Button for Mobile (Flat, Clean) */}
              <button
                onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 cursor-pointer min-h-[38px] transition-colors"
                title="Toggle Language"
                aria-label="Toggle Language"
              >
                <span>{lang === 'EN' ? 'عربي' : 'EN'}</span>
              </button>

              {/* Hamburger Button with guaranteed 44px touch target */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer rounded-lg hover:bg-slate-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center border border-slate-800/80"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: TRANSITIONS.corporateEase }}
            className="lg:hidden overflow-y-auto max-h-[82vh] bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2"
          >
            {/* Language Selector in Mobile Drawer (Flat, No Shadows) */}
            <div className="mb-3 p-2 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {t.common.language}:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLang('EN')}
                  className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                    lang === 'EN'
                      ? 'bg-[#0052CC] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('AR')}
                  className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                    lang === 'AR'
                      ? 'bg-[#0052CC] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left rtl:text-right px-4 py-2.5 min-h-[44px] flex items-center text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    activePage === link.id
                      ? 'bg-[#00C7AE]/15 text-[#00C7AE] font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Actions (Flat, No Shadows) */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTenderModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-xs font-bold uppercase text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#00C7AE]" />
                <span>{t.nav.tenders}</span>
              </button>
              <button
                onClick={() => handleNav('quote')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0041A3] active:bg-[#002D70] rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="w-4 h-4 text-[#00C7AE]" />
              </button>
              <button
                onClick={() => handleNav(isAuthenticated ? 'admin/dashboard' : 'admin/login')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#00C7AE]" />
                <span>{t.nav.adminPortal}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
