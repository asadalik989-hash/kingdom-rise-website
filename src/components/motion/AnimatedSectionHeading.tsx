import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';

interface AnimatedSectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  theme?: 'light' | 'dark';
}

export const AnimatedSectionHeading: React.FC<AnimatedSectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'left',
  className = '',
  theme = 'light',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const alignmentClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  const lineOrigin =
    align === 'center'
      ? 'origin-center mx-auto'
      : align === 'right'
      ? 'origin-right ml-auto'
      : 'origin-left mr-auto';

  if (shouldReduceMotion) {
    return (
      <div className={`space-y-3.5 flex flex-col ${alignmentClass} ${className}`}>
        {kicker && (
          <span className="text-xs font-bold uppercase tracking-widest text-[#00C7AE]">
            {kicker}
          </span>
        )}
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#333333]'}`}>
          {title}
        </h2>
        <div className={`h-1 w-16 bg-gradient-to-r from-[#0052CC] to-[#00C7AE] rounded-full ${lineOrigin}`} />
        {description && (
          <p className={`text-base leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-[#666666]'}`}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3.5 flex flex-col ${alignmentClass} ${className}`}>
      {/* 1. Small Kicker Badge: Fade in */}
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: TRANSITIONS.corporateEase }}
          className="text-xs font-bold uppercase tracking-widest text-[#00C7AE]"
        >
          {kicker}
        </motion.div>
      )}

      {/* 2. Main Title: Fade-up */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: 0.08, ease: TRANSITIONS.corporateEase }}
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-balance leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-[#333333]'
        }`}
      >
        {title}
      </motion.h2>

      {/* 3. Decorative Accent Line: Expands horizontally */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: 0.2, ease: TRANSITIONS.corporateEase }}
        className={`h-1 w-16 bg-gradient-to-r from-[#0052CC] to-[#00C7AE] rounded-full ${lineOrigin}`}
      />

      {/* 4. Description: Fade-up with slight delay */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.28, ease: TRANSITIONS.corporateEase }}
          className={`text-base leading-relaxed text-balance max-w-2xl ${
            theme === 'dark' ? 'text-slate-300' : 'text-[#666666]'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
