import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function GradientText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-primary via-violet-500 to-success bg-clip-text text-transparent dark:via-violet-300',
        className,
      )}
      {...props}
    />
  )
}
