'use client'

import { ArrowLeft, ArrowRight, Printer, RotateCcw } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RevisionPoint } from '@/content/courses'

interface RevisionCardsProps {
  revisionPoints: readonly RevisionPoint[]
}

export function RevisionCards({ revisionPoints }: RevisionCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  if (revisionPoints.length === 0) {
    return (
      <section aria-labelledby="revision-title">
        <h2
          id="revision-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Quick revision
        </h2>
        <div className="mt-5">
          <EmptyState
            icon={RotateCcw}
            title="Revision points coming soon"
            description="Quick-revision cards will be added by the instructor."
          />
        </div>
      </section>
    )
  }

  const activePoint = revisionPoints[activeIndex]

  return (
    <section aria-labelledby="revision-title" className="revision-print-area">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="revision-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Quick revision
        </h2>
        <Button type="button" variant="outline" onClick={() => window.print()}>
          <Printer data-icon="inline-start" aria-hidden="true" /> Print revision
        </Button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {revisionPoints.map((point) => (
          <Card key={point.id} className="bg-card/65 shadow-none">
            <CardHeader>
              <CardTitle>{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {point.summary}
              </p>
              <details className="mt-4 rounded-lg border border-border p-3">
                <summary className="cursor-pointer text-sm font-semibold">
                  Expand explanation
                </summary>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {point.explanation}
                </p>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-primary/20 bg-primary/5 shadow-none">
        <CardHeader>
          <p className="font-mono text-xs text-primary">
            Flashcard {activeIndex + 1} of {revisionPoints.length}
          </p>
          <CardTitle className="text-xl">{activePoint?.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {showAnswer ? (
            <p
              className="rounded-lg bg-background p-4 leading-7"
              aria-live="polite"
            >
              {activePoint?.answer}
            </p>
          ) : (
            <Button type="button" onClick={() => setShowAnswer(true)}>
              Show answer
            </Button>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={activeIndex === 0}
              onClick={() => {
                setActiveIndex((index) => index - 1)
                setShowAnswer(false)
              }}
            >
              <ArrowLeft data-icon="inline-start" aria-hidden="true" /> Previous
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setActiveIndex(0)
                setShowAnswer(false)
              }}
            >
              <RotateCcw data-icon="inline-start" aria-hidden="true" /> Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={activeIndex === revisionPoints.length - 1}
              onClick={() => {
                setActiveIndex((index) => index + 1)
                setShowAnswer(false)
              }}
            >
              Next <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
