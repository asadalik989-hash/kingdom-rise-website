import React, { forwardRef, useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { ButtonVariant, ButtonSize } from '../../types/componentStates';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  isSuccess?: boolean;
  successText?: string;
  isError?: boolean;
  errorText?: string;
  onRetry?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      isSuccess = false,
      successText,
      isError = false,
      errorText,
      onRetry,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const [minWidth, setMinWidth] = useState<number | undefined>(undefined);

    const handleRef = (el: HTMLButtonElement | null) => {
      if (el && !minWidth && !isLoading) {
        setMinWidth(el.offsetWidth);
      }
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    const isDisabled = disabled || isLoading;

    // Size variants
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5 min-h-[34px]',
      md: 'px-4 py-2 text-sm rounded-lg gap-2 min-h-[42px]',
      lg: 'px-6 py-3 text-base rounded-xl gap-2.5 min-h-[50px]',
    };

    // Base styling
    const baseClasses =
      'relative inline-flex items-center justify-center font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 disabled:opacity-60';

    // Variant classes
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-[#0052CC] hover:bg-[#0041A3] active:bg-[#002D70] text-white shadow-sm hover:shadow hover:-translate-y-0.5 focus-visible:ring-[#0052CC] disabled:hover:translate-y-0 disabled:shadow-none',
      secondary:
        'bg-[#00C7AE] hover:bg-[#00B39D] active:bg-[#009683] text-slate-950 font-bold shadow-sm hover:shadow hover:-translate-y-0.5 focus-visible:ring-[#00C7AE] disabled:hover:translate-y-0 disabled:shadow-none',
      outline:
        'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus-visible:ring-[#0052CC]',
      ghost:
        'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 focus-visible:ring-slate-400',
      danger:
        'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm hover:shadow hover:-translate-y-0.5 focus-visible:ring-rose-500 disabled:shadow-none',
      icon: 'p-2 rounded-lg bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400 min-h-[36px] min-w-[36px]',
    };

    // Error state styling
    const errorClasses = isError
      ? 'border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
      : '';

    // Success state styling
    const successClasses = isSuccess
      ? 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
      : '';

    const widthStyle = minWidth ? { minWidth: `${minWidth}px` } : undefined;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      if (isError && onRetry) {
        onRetry();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={handleRef}
        type={props.type || 'button'}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        onClick={handleClick}
        style={widthStyle}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${errorClasses}
          ${successClasses}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
            <span>{loadingText || 'Processing...'}</span>
          </span>
        ) : isSuccess ? (
          <span className="inline-flex items-center gap-2 font-bold animate-in fade-in zoom-in-95 duration-200">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successText || 'Complete'}</span>
          </span>
        ) : isError ? (
          <span className="inline-flex items-center gap-2 font-bold animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorText || 'Retry'}</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
