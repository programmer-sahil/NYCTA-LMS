import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  headingId?: string
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
