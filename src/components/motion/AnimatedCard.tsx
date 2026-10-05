import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITIONS } from './MotionConfig';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverLift?: number;
  glow?: boolean;
  tilt?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  onClick,
  hoverLift = -4,
  glow = false,
  tilt = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || shouldReduceMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Keep tilt restrained (max 2.2 degrees) to avoid layout shifts or unreadable text
    const rotateX = ((y - centerY) / centerY) * -2.2;
    const rotateY = ((x - centerX) / centerX) * 2.2;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (!tilt || shouldReduceMotion || isTouchDevice) return;
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  if (shouldReduceMotion) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tiltStyle.rotateX,
        rotateY: tiltStyle.rotateY,
      }}
      transition={{
        rotateX: { duration: 0.18, ease: 'easeOut' },
        rotateY: { duration: 0.18, ease: 'easeOut' },
      }}
      style={{
        transformStyle: tilt ? 'preserve-3d' : undefined,
        perspective: tilt ? 1000 : undefined,
      }}
      whileHover={{
        y: hoverLift,
        transition: { duration: 0.28, ease: TRANSITIONS.snappyEase },
      }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={`transition-shadow duration-300 ${
        glow
          ? 'hover:shadow-[0_12px_30px_-6px_rgba(0,199,174,0.18)] hover:border-[#00C7AE]/30'
          : 'hover:shadow-xl'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
