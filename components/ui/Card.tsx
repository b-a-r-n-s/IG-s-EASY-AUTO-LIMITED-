'use client'
import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat' | 'outlined'
  hover?: boolean
  clickable?: boolean
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hover = false,
      clickable = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'rounded-lg transition-all duration-300 overflow-hidden'

    // Variant styles
    const variantStyles = {
      default:
        'bg-primary-dark-gray border border-primary-gold shadow-md',
      elevated:
        'bg-primary-dark-gray border border-primary-gold shadow-lg hover:shadow-gold-lg',
      flat: 'bg-primary-dark-gray border border-primary-dark-gray',
      outlined:
        'bg-transparent border-2 border-primary-gold',
    }

    // Padding styles
    const paddingStyles = {
      sm: 'p-3 sm:p-4',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
    }

    // Hover effects
    const hoverStyles =
      hover || clickable
        ? 'hover:shadow-gold hover:border-primary-dark-gold hover:scale-105 cursor-pointer'
        : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  props.onClick?.(e as any)
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pb-4 border-b border-primary-gold', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

// Card Title Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-lg font-bold',
      md: 'text-xl font-bold',
      lg: 'text-2xl font-bold',
    }

    return (
      <h3
        ref={ref}
        className={cn(
          'text-white',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

// Card Description Component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-primary-silver', className)}
    {...props}
  >
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-primary-gold flex gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
