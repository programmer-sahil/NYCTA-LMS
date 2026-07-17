import { BookOpenText } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-primary/35 bg-card text-primary shadow-sm',
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-secondary-foreground to-success" />
      <BookOpenText className="size-5" strokeWidth={1.8} />
      <span className="absolute right-1.5 bottom-1.5 size-1 rounded-full bg-warning" />
    </span>
  )
}
