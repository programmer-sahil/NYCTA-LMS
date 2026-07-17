'use client'

import { CircleAlert, RotateCcw } from 'lucide-react'

import { SecondaryButton } from '@/components/shared/secondary-button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card
      className="border-destructive/35 bg-destructive/5 shadow-none"
      role="alert"
    >
      <CardContent className="flex flex-col items-center px-5 py-10 text-center">
        <span className="grid size-11 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <CircleAlert className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-base font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {onRetry ? (
          <SecondaryButton type="button" onClick={onRetry} className="mt-5">
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Try again
          </SecondaryButton>
        ) : null}
      </CardContent>
    </Card>
  )
}
