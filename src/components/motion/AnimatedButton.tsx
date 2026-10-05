import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Loader2, Check } from 'lucide-react';
import { TRANSITIONS } from './MotionConfig';

interface AnimatedButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'teal' | 'gradient';
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  isSuccess = false,
  successText = 'Completed',
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-[#00C7AE] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#0052CC] hover:bg-[#0041A3] active:bg-[#002D70] text-white',
    teal: 'bg-[#00C7AE] hover:bg-[#00B39D] active:bg-[#009683] text-white',
    gradient: 'bg-gradient-to-r from-[#0052CC] to-[#00C7AE] hover:opacity-95 active:opacity-90 text-white',
    secondary: 'bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/70 hover:border-[#00C7AE]/50',
    outline: 'bg-transparent hover:bg-[#0052CC]/10 active:bg-[#0052CC]/20 text-[#0052CC] border border-[#0052CC]',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
    dark: 'bg-[#09111E] hover:bg-[#0F1E36] text-white border border-slate-800',
  }[variant];

  if (shouldReduceMotion) {
    return (
      <button
        disabled={disabled || isLoading || isSuccess}
        className={`${baseStyles} ${variantStyles} px-5 py-3 ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isSuccess && <Check className="w-4 h-4 mr-2 text-emerald-600" />}
        {isSuccess ? successText : children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={disabled || isLoading || isSuccess ? undefined : { y: -1.5, transition: { duration: 0.2, ease: TRANSITIONS.snappyEase } }}
      whileTap={disabled || isLoading || isSuccess ? undefined : { scale: 0.98 }}
      disabled={disabled || isLoading || isSuccess}
      className={`${baseStyles} ${variantStyles} px-5 py-3 group ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </span>
      ) : isSuccess ? (
        <span className="inline-flex items-center gap-1.5 text-emerald-800">
          <Check className="w-4 h-4" />
          <span>{successText}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {icon}
            </span>
          )}
        </span>
      )}
    </motion.button>
  );
};
