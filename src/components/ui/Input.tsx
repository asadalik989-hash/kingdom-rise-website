import React, { forwardRef, useId } from 'react';
import { AlertCircle, Eye, EyeOff, Search } from 'lucide-react';

export interface BaseInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  isValid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  containerClassName?: string;
}

// 1. Text Input
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      error,
      isValid,
      leftIcon,
      rightIcon,
      required,
      className = '',
      containerClassName = '',
      id,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const isInvalid = Boolean(error);

    return (
      <div className={`w-full space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 select-none"
          >
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative rounded-lg shadow-2xs">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={isInvalid}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              w-full rounded-lg text-sm bg-white dark:bg-slate-900 border transition-all duration-200
              placeholder:text-slate-400 text-slate-900 dark:text-slate-100
              focus:outline-none
              ${leftIcon ? 'pl-9' : 'pl-3.5'}
              ${rightIcon || isInvalid ? 'pr-9' : 'pr-3.5'}
              py-2.5 min-h-[42px]
              ${
                isInvalid
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20'
              }
              ${disabled ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border-slate-200 dark:border-slate-700' : ''}
              ${readOnly ? 'bg-slate-50 dark:bg-slate-800/50 cursor-default' : ''}
              ${className}
            `}
            {...props}
          />

          {rightIcon && !isInvalid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}

          {isInvalid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-rose-500 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

// 2. Password Input with Reveal Toggle
export const PasswordInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <TextInput
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

// 3. Search Input with Clear Button
export interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onClear, className = '', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        type="search"
        leftIcon={<Search className="w-4 h-4 text-slate-400" />}
        value={value}
        className={`pr-8 ${className}`}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';

// 4. Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseInputProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      className = '',
      containerClassName = '',
      id,
      disabled,
      readOnly,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const isInvalid = Boolean(error);

    return (
      <div className={`w-full space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 select-none"
          >
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative rounded-lg shadow-2xs">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={isInvalid}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              w-full rounded-lg text-sm bg-white dark:bg-slate-900 border transition-all duration-200
              placeholder:text-slate-400 text-slate-900 dark:text-slate-100
              focus:outline-none p-3
              ${
                isInvalid
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20'
              }
              ${disabled ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : ''}
              ${readOnly ? 'bg-slate-50 dark:bg-slate-800/50 cursor-default' : ''}
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// 5. Select Input Component
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseInputProps {
  options?: (string | SelectOption)[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      options = [],
      children,
      className = '',
      containerClassName = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const isInvalid = Boolean(error);

    return (
      <div className={`w-full space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 select-none"
          >
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative rounded-lg shadow-2xs">
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isInvalid}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              w-full rounded-lg text-sm bg-white dark:bg-slate-900 border transition-all duration-200
              text-slate-900 dark:text-slate-100 py-2.5 px-3.5 min-h-[42px] appearance-none cursor-pointer
              focus:outline-none
              ${
                isInvalid
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20'
              }
              ${disabled ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : ''}
              ${className}
            `}
            {...props}
          >
            {children}
            {options.map((opt) => {
              if (typeof opt === 'string') {
                return (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                );
              }
              return (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              );
            })}
          </select>

          {/* Custom Chevron Indicator */}
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
SelectInput.displayName = 'SelectInput';
