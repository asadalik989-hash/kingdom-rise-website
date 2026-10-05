import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.6,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  // Extract numeric and non-numeric parts
  const rawStr = String(value).trim();
  const match = rawStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);

  const prefix = match ? match[1] : '';
  const numericStr = match ? match[2].replace(/,/g, '') : '0';
  const suffix = match ? match[3] : '';
  const targetNumber = parseFloat(numericStr) || 0;
  const isInteger = !numericStr.includes('.');

  const [displayValue, setDisplayValue] = useState<number>(shouldReduceMotion ? targetNumber : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayValue(targetNumber);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: 1 - Math.pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * targetNumber;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  // If not parseable as numeric, just render original string
  if (!match) {
    return <span ref={ref} className={className}>{rawStr}</span>;
  }

  const formattedNumber = isInteger
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
