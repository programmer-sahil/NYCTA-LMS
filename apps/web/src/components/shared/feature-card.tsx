import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber'
  className?: string
}

const accentClasses = {
  cyan: 'bg-primary/10 text-primary',
  violet: 'bg-secondary text-secondary-foreground',
  emerald: 'bg-success/10 text-success',
  amber: 'bg-warning/10 text-warning-foreground dark:text-warning',
} as const

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = 'cyan',
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        'h-full border-border/80 bg-card/75 shadow-none transition-colors hover:border-primary/35',
        className,
      )}
    >
      <CardHeader>
        <span
          className={cn(
            'grid size-10 place-items-center rounded-lg',
            accentClasses[accent],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle className="mt-3 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
