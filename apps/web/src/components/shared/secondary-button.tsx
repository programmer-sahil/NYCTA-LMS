import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SecondaryButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn(
        'h-10 rounded-lg border-border bg-card/70 px-4 text-sm font-semibold hover:bg-muted',
        className,
      )}
      {...props}
    />
  )
}
