'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

interface CarouselProps {
  children: React.ReactNode[]
  autoplay?: boolean
  autoplayDelay?: number
  showDots?: boolean
  showArrows?: boolean
  loop?: boolean
  className?: string
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoplay = true,
      autoplayDelay = 5000,
      showDots = true,
      showArrows = true,
      loop = true,
      className,
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      { loop, align: 'center' },
      autoplay ? [Autoplay({ delay: autoplayDelay })] : []
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    // Update selected index on carousel change
    const onSelect = useCallback(() => {
      if (!emblaApi) return
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    // Initialize dots
    useEffect(() => {
      if (!emblaApi) return
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect)
      onSelect()
    }, [emblaApi, onSelect])

    // Scroll to slide
    const scrollTo = useCallback(
      (index: number) => emblaApi && emblaApi.scrollTo(index),
      [emblaApi]
    )

    // Next slide
    const scrollNext = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, [emblaApi])

    // Previous slide
    const scrollPrev = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollPrev()
    }, [emblaApi])

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Carousel viewport */}
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex gap-4">
            {children.map((child, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0"
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Controls container */}
        <div className="flex items-center justify-between mt-6 gap-4">
          {/* Previous button */}
          {showArrows && (
            <button
              onClick={scrollPrev}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-gold text-black hover:bg-primary-dark-gold transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Previous slide"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Dots/Indicators */}
          {showDots && (
            <div className="flex items-center justify-center gap-2 flex-1">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    index === selectedIndex
                      ? 'bg-primary-gold w-8'
                      : 'bg-primary-silver hover:bg-primary-gold'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === selectedIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          )}

          {/* Next button */}
          {showArrows && (
            <button
              onClick={scrollNext}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-gold text-black hover:bg-primary-dark-gold transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Next slide"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Slide counter (optional) */}
        <div className="text-center mt-4 text-sm text-primary-silver">
          {selectedIndex + 1} / {children.length}
        </div>
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'

export default Carousel

// Simple carousel without auto-rotation
interface SimpleCarouselProps {
  children: React.ReactNode[]
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

const SimpleCarousel = React.forwardRef<HTMLDivElement, SimpleCarouselProps>(
  ({ children, showDots = true, showArrows = true, className }, ref) => {
    return (
      <Carousel
        ref={ref}
        autoplay={false}
        showDots={showDots}
        showArrows={showArrows}
        className={className}
      >
        {children}
      </Carousel>
    )
  }
)

SimpleCarousel.displayName = 'SimpleCarousel'

export { SimpleCarousel }
