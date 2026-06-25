import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50'

    const variantStyles = {
      primary: 'bg-primary-gold text-black hover:bg-primary-dark-gold active:scale-95',
      secondary: 'bg-primary-dark-gray text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-black',
      outline: 'bg-transparent text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-black',
      ghost: 'bg-transparent text-primary-gold hover:bg-primary-dark-gray',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {isLoading ? <span className="animate-spin">⟳</span> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
