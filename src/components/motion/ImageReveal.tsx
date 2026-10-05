import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  zoomOnHover?: boolean;
  priority?: boolean;
  badge?: string;
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
  zoomOnHover = true,
  badge,
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden group rounded-xl bg-slate-950 ${aspectRatio} ${className}`}>
      {/* 3D Clip-path & Scale entrance reveal */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.06, clipPath: 'inset(6% 0% 0% 0%)' }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.0, clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.9,
          ease: TRANSITIONS.corporateEase,
        }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            zoomOnHover && !isTouchDevice ? 'group-hover:scale-105' : ''
          }`}
        />
      </motion.div>

      {/* Subtle depth gradient overlay that deepens slightly on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

      {badge && (
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10 bg-slate-900/90 backdrop-blur-xs text-[#00C7AE] text-[10px] font-mono font-semibold px-2.5 py-1 rounded border border-slate-700/50">
          {badge}
        </div>
      )}

      {children && (
        <div className="absolute inset-0 z-10 p-5 flex flex-col justify-end text-white transition-transform duration-300 group-hover:-translate-y-1">
          {children}
        </div>
      )}
    </div>
  );
};
