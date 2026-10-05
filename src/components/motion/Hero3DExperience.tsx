import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';
import { ChevronRight, ShieldCheck, HardHat, Compass } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface Hero3DExperienceProps {
  heroImage: string;
  kicker: string;
  companyName: string;
  title: string;
  subtitle: string;
  ctaQuoteText: string;
  ctaProjectsText: string;
  onQuoteClick: () => void;
  onProjectsClick: () => void;
  lang: string;
  metrics: {
    projectsTitle: string;
    fleetTitle: string;
    safetyTitle: string;
    onTimeDelivery: string;
  };
}

export const Hero3DExperience: React.FC<Hero3DExperienceProps> = ({
  heroImage,
  kicker,
  companyName,
  title,
  subtitle,
  ctaQuoteText,
  ctaProjectsText,
  onQuoteClick,
  onProjectsClick,
  lang,
  metrics,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Scroll-based parallax depth transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const scrollBgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const scrollContentY = useTransform(scrollYProgress, [0, 1], ['0px', '45px']);
  const scrollContentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  // Restrained mouse parallax state (max 10-18px, rotation max 2-3 degrees)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || isTouchDevice || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Restrained parameters to prevent disorientation or clipping (under 3.5 deg)
      setMousePos({
        x: xNorm * 18,
        y: yNorm * 18,
        rotX: yNorm * -3.0,
        rotY: xNorm * 3.0,
      });
    },
    [shouldReduceMotion, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0, rotX: 0, rotY: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice && !shouldReduceMotion) {
      setIsHovered(true);
    }
  }, [isTouchDevice, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* LAYER 1: CINEMATIC HERO BACKGROUND IMAGE WITH INITIAL SCALE ZOOM + SCROLL PARALLAX */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={
          shouldReduceMotion
            ? undefined
            : {
                scale: scrollBgScale,
                y: scrollBgY,
              }
        }
      >
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.08 }}
          animate={{
            scale: 1.0,
            x: mousePos.x * -0.5,
            y: mousePos.y * -0.5,
          }}
          transition={{
            scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.25, ease: 'easeOut' },
            y: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          <img
            src={heroImage}
            alt={lang === 'AR' ? 'مشاريع البنية التحتية والمقاولات شركة نهضة المملكة' : 'Kingdom Rise Limited Saudi Infrastructure & Mega Engineering'}
            className="w-full h-full object-cover object-center brightness-80 contrast-105"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>

      {/* LAYER 2: DARK / BRAND GRADIENT SCRIM & TECHNICAL VIGNETTE (WCAG AA CONTRAST) */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      {/* ATMOSPHERIC FLOATING PARTICLES (EXTREMELY SUBTLE DUST MOTES) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#00C7AE] opacity-25"
              style={{
                width: i % 2 === 0 ? 3 : 2,
                height: i % 2 === 0 ? 3 : 2,
                top: `${14 + i * 13}%`,
                left: `${8 + i * 16}%`,
              }}
              animate={{
                y: [0, -16, 0],
                x: [0, i % 2 === 0 ? 8 : -8, 0],
                opacity: [0.12, 0.35, 0.12],
              }}
              transition={{
                duration: 5.5 + i * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* LAYER 3: SUBTLE ENGINEERING BLUEPRINT GRID & TECHNICAL COORDINATES */}
      <motion.div
        className="absolute inset-0 z-2 pointer-events-none opacity-40"
        animate={{
          x: mousePos.x * 0.8,
          y: mousePos.y * 0.8,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* SVG Blueprint Grid Lines */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="krc-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 199, 174, 0.12)" strokeWidth="0.75" />
              <circle cx="60" cy="60" r="1.5" fill="rgba(0, 199, 174, 0.25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#krc-grid-pattern)" />
        </svg>

        {/* Technical Coordinate HUD Overlays */}
        <div className="absolute top-6 left-8 rtl:left-auto rtl:right-8 flex items-center gap-3 font-mono text-[10px] tracking-wider text-slate-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C7AE] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C7AE]" />
          </span>
          <span className="text-[#00C7AE]">LIVE SITE ACTIVE</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">21°32'36"N 39°10'22"E · JEDDAH HQ</span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline">DATUM: WGS84 · ELEV: +14.2m MSL</span>
        </div>

        <div className="absolute bottom-6 right-8 rtl:right-auto rtl:left-8 hidden md:flex items-center gap-4 font-mono text-[10px] tracking-wider text-slate-400">
          <span>CIVIL · ELECTRICAL · MECHANICAL</span>
          <span className="text-[#00C7AE]">ISO 9001:2015 COMPLIANT</span>
        </div>
      </motion.div>

      {/* LAYER 4: 3D STRUCTURAL ENGINEERING FRAMEWORK (CSS 3D ISOMETRIC BEAM LATTICE) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute right-4 lg:right-16 rtl:right-auto rtl:left-4 lg:rtl:left-16 top-1/2 -translate-y-1/2 z-3 pointer-events-none hidden md:block"
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          animate={{
            rotateX: mousePos.rotX * 1.5,
            rotateY: mousePos.rotY * 1.5,
            x: mousePos.x * 1.2,
            y: mousePos.y * 1.2,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Subtle Isometric Structural Framework Wireframe with ambient breath */}
          <motion.div
            className="relative w-72 h-72 lg:w-96 lg:h-96 opacity-35 hover:opacity-50 transition-opacity"
            animate={{
              rotateZ: [0, 1.2, 0, -1.2, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#00C7AE] fill-none stroke-[1.25]">
              {/* Outer Framework Polygon */}
              <polygon points="200,40 360,130 360,310 200,390 40,310 40,130" strokeOpacity="0.4" />
              {/* Inner Structural Beams */}
              <line x1="200" y1="40" x2="200" y2="390" strokeOpacity="0.5" strokeDasharray="4 4" />
              <line x1="40" y1="130" x2="360" y2="310" strokeOpacity="0.3" />
              <line x1="40" y1="310" x2="360" y2="130" strokeOpacity="0.3" />
              {/* Central Core Nodes */}
              <circle cx="200" cy="220" r="4" fill="#00C7AE" />
              <circle cx="200" cy="40" r="3" fill="#0052CC" />
              <circle cx="360" cy="130" r="3" fill="#0052CC" />
              <circle cx="360" cy="310" r="3" fill="#0052CC" />
              <circle cx="200" cy="390" r="3" fill="#0052CC" />
              <circle cx="40" cy="310" r="3" fill="#0052CC" />
              <circle cx="40" cy="130" r="3" fill="#0052CC" />
              {/* Radial Truss Coordinates */}
              <text x="210" y="35" fill="rgba(0, 199, 174, 0.7)" fontSize="10" fontFamily="monospace">NODE-01</text>
              <text x="365" y="135" fill="rgba(0, 199, 174, 0.7)" fontSize="10" fontFamily="monospace">TRUSS-B</text>
              <text x="210" y="215" fill="#00C7AE" fontSize="10" fontFamily="monospace">CENTRAL BEAM</text>
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* LAYER 5, 6, 7: HERO CONTENT, SEQUENCED TEXT, CTA BUTTONS & FLOATING BADGES */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <motion.div
          className="max-w-3xl space-y-6"
          style={{
            transformStyle: 'preserve-3d',
            y: shouldReduceMotion ? 0 : scrollContentY,
            opacity: shouldReduceMotion ? 1 : scrollContentOpacity,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotateX: mousePos.rotX * 0.7,
                  rotateY: mousePos.rotY * 0.7,
                  x: mousePos.x * 0.4,
                  y: mousePos.y * 0.4,
                }
          }
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* STEP 1: EYEBROW / SMALL LABEL */}
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.15, ease: TRANSITIONS.corporateEase }}
            className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#00C7AE]"
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded border border-[#00C7AE]/20">
              <Compass className="w-3.5 h-3.5 text-[#00C7AE] animate-spin-slow" />
              <span>{lang === 'AR' ? 'شركة نهضة المملكة المحدودة' : companyName}</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{kicker}</span>
          </motion.div>

          {/* STEP 2: MAIN HEADLINE REVEAL (CINEMATIC) */}
          <motion.h1
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.3, ease: TRANSITIONS.corporateEase }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance"
          >
            {title}
          </motion.h1>

          {/* STEP 3: SUPPORTING PARAGRAPH */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: TRANSITIONS.corporateEase }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-balance max-w-2xl"
          >
            {subtitle}
          </motion.p>

          {/* STEP 4: PRIMARY & SECONDARY CTA BUTTONS WITH MAGNETIC HOVER & 3D DEPTH */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65, ease: TRANSITIONS.corporateEase }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary CTA with 3D lift */}
            <motion.button
              onClick={onQuoteClick}
              whileHover={{
                y: -3,
                scale: 1.02,
                boxShadow: '0 12px 28px -6px rgba(0, 199, 174, 0.35)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-6 font-bold text-sm text-slate-950 bg-[#00C7AE] hover:bg-[#00B29C] rounded-lg transition-colors cursor-pointer shadow-lg"
            >
              <span>{ctaQuoteText}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={onProjectsClick}
              whileHover={{
                y: -3,
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-6 font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-slate-700/80 hover:border-slate-500 rounded-lg transition-colors cursor-pointer backdrop-blur-xs"
            >
              <span>{ctaProjectsText}</span>
              <ChevronRight className="w-4 h-4 text-[#00C7AE] transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </motion.button>
          </motion.div>

          {/* STEP 5: TRUST SIGNALS & TELEMETRY BADGES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82, ease: TRANSITIONS.corporateEase }}
            className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-slate-300"
          >
            <div className="space-y-1">
              <span className="block text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                <AnimatedCounter value="53+" duration={1.5} />
              </span>
              <span className="text-xs text-slate-400">{metrics.projectsTitle}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                <AnimatedCounter value="270+" duration={1.6} />
              </span>
              <span className="text-xs text-slate-400">{metrics.fleetTitle}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl sm:text-3xl font-bold text-[#00C7AE] font-mono tabular-nums">
                0 LTI
              </span>
              <span className="text-xs text-slate-400">{metrics.safetyTitle}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                <AnimatedCounter value="100%" duration={1.4} />
              </span>
              <span className="text-xs text-slate-400">{metrics.onTimeDelivery}</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

