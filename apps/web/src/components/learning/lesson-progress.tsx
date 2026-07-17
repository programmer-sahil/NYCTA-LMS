'use client'

import { CheckCircle2, Circle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import { localStudentProgressService } from '@/lib/student-progress'

interface LessonProgressProps {
  lessonId: string
  continueHref?: string
}

export function LessonProgress({
  lessonId,
  continueHref,
}: LessonProgressProps) {
  const isComplete = useSyncExternalStore(
    localStudentProgressService.subscribe,
    () => localStudentProgressService.getCompletedLessons().includes(lessonId),
    () => false,
  )

  return (
    <div className="rounded-xl border border-border bg-card/65 p-4">
      <p className="text-sm font-semibold">Lesson progress</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        Saved only in this browser during the current no-account phase.
      </p>
      <Button
        type="button"
        variant={isComplete ? 'secondary' : 'default'}
        className="mt-4 w-full"
        aria-pressed={isComplete}
        onClick={() => {
          if (isComplete) {
            localStudentProgressService.unmarkLessonComplete(lessonId)
          } else {
            localStudentProgressService.markLessonComplete(lessonId)
          }
        }}
      >
        {isComplete ? (
          <CheckCircle2 data-icon="inline-start" aria-hidden="true" />
        ) : (
          <Circle data-icon="inline-start" aria-hidden="true" />
        )}
        {isComplete ? 'Completed' : 'Mark as complete'}
      </Button>
      {isComplete ? (
        <div
          className="mt-4 rounded-lg border border-success/20 bg-success/5 p-3"
          aria-live="polite"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <Sparkles className="size-4" aria-hidden="true" />
            Lesson complete — well done!
          </p>
          {continueHref ? (
            <Link
              href={continueHref}
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Continue learning
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
