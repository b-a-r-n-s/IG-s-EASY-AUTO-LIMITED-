import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      required = false,
      className,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const id = props.id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="mb-2 text-sm font-semibold text-white block"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gold pointer-events-none flex-shrink-0">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            className={cn(
              // Base styles
              'w-full bg-primary-dark-gray text-white placeholder-primary-silver rounded-lg transition-all duration-300',
              // Padding
              'px-4 py-2.5',
              // Border
              'border-2',
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-primary-gold focus:border-primary-dark-gold focus:ring-primary-gold/20',
              // Focus
              'focus:outline-none focus:ring-2',
              // Icon padding adjustments
              icon && iconPosition === 'left' ? 'pl-10' : '',
              icon && iconPosition === 'right' ? 'pr-10' : '',
              // Disabled state
              disabled
                ? 'bg-primary-gray opacity-50 cursor-not-allowed'
                : 'hover:border-primary-dark-gold',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gold pointer-events-none flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>
        )}

        {/* Hint text */}
        {hint && !hasError && (
          <p className="mt-1.5 text-sm text-primary-silver">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

// Textarea Component
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
  required?: boolean
  rows?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      required = false,
      rows = 4,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const id = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="mb-2 text-sm font-semibold text-white block"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea field */}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          className={cn(
            // Base styles
            'w-full bg-primary-dark-gray text-white placeholder-primary-silver rounded-lg transition-all duration-300 resize-vertical',
            // Padding
            'px-4 py-2.5',
            // Border
            'border-2',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-primary-gold focus:border-primary-dark-gold focus:ring-primary-gold/20',
            // Focus
            'focus:outline-none focus:ring-2',
            // Disabled state
            disabled
              ? 'bg-primary-gray opacity-50 cursor-not-allowed'
              : 'hover:border-primary-dark-gold',
            className
          )}
          {...props}
        />

        {/* Error message */}
        {hasError && (
          <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>
        )}

        {/* Hint text */}
        {hint && !hasError && (
          <p className="mt-1.5 text-sm text-primary-silver">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  fullWidth?: boolean
  required?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      required = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const id = props.id || `select-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="mb-2 text-sm font-semibold text-white block"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select field */}
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            // Base styles
            'w-full bg-primary-dark-gray text-white placeholder-primary-silver rounded-lg transition-all duration-300 appearance-none cursor-pointer',
            // Padding
            'px-4 py-2.5 pr-8',
            // Border
            'border-2',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-primary-gold focus:border-primary-dark-gold focus:ring-primary-gold/20',
            // Focus
            'focus:outline-none focus:ring-2',
            // Disabled state
            disabled
              ? 'bg-primary-gray opacity-50 cursor-not-allowed'
              : 'hover:border-primary-dark-gold',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown arrow icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary-gold">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Error message */}
        {hasError && (
          <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>
        )}

        {/* Hint text */}
        {hint && !hasError && (
          <p className="mt-1.5 text-sm text-primary-silver">{hint}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
