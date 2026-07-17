import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CourseBadgeTone = 'cyan' | 'violet' | 'emerald' | 'amber'

interface CourseBadgeProps {
  children: ReactNode
  tone?: CourseBadgeTone
  className?: string
}

const toneClasses: Record<CourseBadgeTone, string> = {
  cyan: 'border-primary/30 bg-primary/10 text-primary',
  violet:
    'border-secondary-foreground/25 bg-secondary text-secondary-foreground',
  emerald: 'border-success/30 bg-success/10 text-success',
  amber:
    'border-warning/35 bg-warning/10 text-warning-foreground dark:text-warning',
}

export function CourseBadge({
  children,
  tone = 'cyan',
  className,
}: CourseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full px-3 py-1 font-mono text-xs',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Badge>
  )
}
