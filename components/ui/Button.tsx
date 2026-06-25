import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed'

    // Variant styles
    const variantStyles = {
      primary:
        'bg-primary-gold text-black hover:bg-primary-dark-gold hover:shadow-gold active:scale-95',
      secondary:
        'bg-primary-dark-gray text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-black active:scale-95',
      outline:
        'bg-transparent text-primary-gold border-2 border-primary-gold hover:bg-primary-gold hover:text-black active:scale-95',
      ghost:
        'bg-transparent text-primary-gold hover:bg-primary-dark-gray hover:text-white active:scale-95',
      danger:
        'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95',
    }

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    }

    // Full width
    const fullWidthStyles = fullWidth ? 'w-full' : ''

    // Focus ring color based on variant
    const focusRingColor = {
      primary: 'focus-visible:ring-primary-gold',
      secondary: 'focus-
