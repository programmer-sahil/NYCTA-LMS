'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 480)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={cn(
        'fixed right-4 bottom-4 z-40 rounded-full border-border bg-card/95 shadow-lg transition-all sm:right-6 sm:bottom-6',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" />
    </Button>
  )
}
