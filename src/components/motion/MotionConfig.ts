/**
 * Kingdom Rise Limited - Motion & Animation Design Tokens
 * Architectural & Engineering Sophistication
 */

export const TRANSITIONS = {
  // Cubic bezier curves for authoritative, smooth motion
  corporateEase: [0.22, 1, 0.36, 1] as const, // Smooth deceleration, no bounce
  cinematicEase: [0.16, 1, 0.3, 1] as const, // Slow start, ultra-smooth landing
  snappyEase: [0.25, 0.8, 0.25, 1] as const, // Quick responsiveness for micro-interactions
  
  // Timing guidelines
  duration: {
    micro: 0.2,       // Button taps, icon toggles
    standard: 0.35,   // Card hovers, filter transitions
    reveal: 0.65,     // Section scroll reveals
    cinematic: 1.1,   // Hero banners, large masks
    heroZoom: 18.0,   // Ultra-slow Ken Burns background
  },
};

export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: TRANSITIONS.corporateEase } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: TRANSITIONS.corporateEase } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: TRANSITIONS.corporateEase } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: TRANSITIONS.corporateEase } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: TRANSITIONS.corporateEase } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: TRANSITIONS.corporateEase } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: TRANSITIONS.corporateEase } },
  },
};
