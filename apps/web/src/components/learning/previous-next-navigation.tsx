import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Course, CourseModule, Lesson } from '@/content/courses'
import { cn } from '@/lib/utils'

interface PreviousNextNavigationProps {
  course: Course
  courseModule: CourseModule
  lesson: Lesson
  mobile?: boolean
}

export function PreviousNextNavigation({
  course,
  courseModule,
  lesson,
  mobile = false,
}: PreviousNextNavigationProps) {
  const previousLesson = courseModule.lessons.find(
    (item) => item.slug === lesson.previousLesson,
  )
  const nextLesson = courseModule.lessons.find(
    (item) => item.slug === lesson.nextLesson,
  )
  const basePath = `/courses/${course.slug}/${courseModule.slug}`

  return (
    <nav
      aria-label={mobile ? 'Mobile lesson navigation' : 'Lesson navigation'}
      className={cn(
        'grid gap-3 sm:grid-cols-2',
        mobile &&
          'fixed inset-x-0 bottom-0 z-40 grid-cols-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden',
      )}
    >
      {previousLesson ? (
        <Link
          href={`${basePath}/${previousLesson.slug}`}
          className={cn(
            'rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/35',
            mobile && 'truncate p-3 text-sm',
          )}
        >
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Previous
          </span>
          <span className="mt-2 block truncate font-semibold">
            {previousLesson.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {nextLesson ? (
        <Link
          href={`${basePath}/${nextLesson.slug}`}
          className={cn(
            'rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/35',
            mobile && 'truncate p-3 text-sm',
          )}
        >
          <span className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
            Next <ArrowRight className="size-4" aria-hidden="true" />
          </span>
          <span className="mt-2 block truncate font-semibold">
            {nextLesson.title}
          </span>
        </Link>
      ) : (
        <Link
          href={basePath}
          className={cn(
            'rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/35',
            mobile && 'truncate p-3 text-sm',
          )}
        >
          <span className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
            Module <ArrowRight className="size-4" aria-hidden="true" />
          </span>
          <span className="mt-2 block truncate font-semibold">
            Back to overview
          </span>
        </Link>
      )}
    </nav>
  )
}
