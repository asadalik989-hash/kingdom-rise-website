import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = TRANSITIONS.duration.reveal,
  distance = 24,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (variant) {
      case 'fade-up':
        return { opacity: 0, y: distance };
      case 'slide-left':
        return { opacity: 0, x: -distance };
      case 'slide-right':
        return { opacity: 0, x: distance };
      case 'scale-up':
        return { opacity: 0, scale: 0.96 };
      case 'fade-in':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case 'fade-up':
        return { opacity: 1, y: 0 };
      case 'slide-left':
      case 'slide-right':
        return { opacity: 1, x: 0 };
      case 'scale-up':
        return { opacity: 1, scale: 1 };
      case 'fade-in':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: TRANSITIONS.corporateEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
