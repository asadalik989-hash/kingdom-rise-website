import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { DBTestimonial } from '../../types/database';
import { TRANSITIONS } from './MotionConfig';

interface TestimonialCarouselProps {
  testimonials: DBTestimonial[];
  autoplayInterval?: number; // ms, default 7000
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoplayInterval = 7500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const total = testimonials.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, autoplayInterval]);

  if (!total) return null;

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: TRANSITIONS.corporateEase,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: TRANSITIONS.corporateEase,
      },
    }),
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Client Testimonials Carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative max-w-4xl mx-auto px-4 sm:px-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-2xl"
    >
      <div className="relative overflow-hidden min-h-[260px] sm:min-h-[220px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id || currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full text-center space-y-6"
          >
            <Quote className="w-10 h-10 text-amber-400/40 mx-auto" />
            
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto italic">
              "{current.testimonialText}"
            </blockquote>

            <div className="space-y-1">
              <span className="block font-bold text-white text-base">
                {current.clientName}
              </span>
              <span className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {current.position} · {current.company}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="p-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-amber-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="p-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
