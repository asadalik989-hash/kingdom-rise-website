import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: TRANSITIONS.corporateEase,
      }}
    >
      {children}
    </motion.div>
  );
};
