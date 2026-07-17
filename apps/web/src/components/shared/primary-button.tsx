import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PrimaryButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        'h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/15 hover:bg-primary/90',
        className,
      )}
      {...props}
    />
  )
}
