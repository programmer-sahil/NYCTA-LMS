import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { CourseBadge } from '@/components/shared/course-badge'
import { SecondaryButton } from '@/components/shared/secondary-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Course } from '@/content/courses'
import { cn } from '@/lib/utils'

import { CourseIcon } from './course-icon'

interface CourseCardProps {
  course: Course
  number?: number
}

const themeClasses = {
  cyan: 'from-primary/22 via-primary/5 text-primary',
  violet:
    'from-secondary-foreground/18 via-secondary/20 text-secondary-foreground',
  emerald: 'from-success/18 via-success/5 text-success',
  amber:
    'from-warning/18 via-warning/5 text-warning-foreground dark:text-warning',
} as const

export function CourseCard({ course, number }: CourseCardProps) {
  const courseHref = `/courses/${course.slug}`

  return (
    <Card className="group relative h-full overflow-hidden border-border/80 bg-card/80 shadow-none transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-black/5">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent opacity-80',
          themeClasses[course.theme],
        )}
        aria-hidden="true"
      />
      <CardHeader className="relative">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'grid size-10 place-items-center rounded-xl border border-current/15 bg-background/70',
              themeClasses[course.theme],
            )}
          >
            <CourseIcon name={course.icon} />
          </span>
          {number ? (
            <span className="font-mono text-xs text-muted-foreground">
              {String(number).padStart(2, '0')}
            </span>
          ) : (
            <CourseBadge tone={course.theme}>{course.category}</CourseBadge>
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <CourseBadge tone={course.theme}>{course.level}</CourseBadge>
          <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
            {course.durationLabel}
          </span>
        </div>
        <CardTitle className="mt-4 text-xl tracking-tight">
          <Link
            href={courseHref}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {course.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {course.description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {course.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-success"
                aria-hidden="true"
              />
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative border-t border-border/70 pt-4">
        <SecondaryButton
          asChild
          className="relative z-10 w-full justify-between"
        >
          <Link href={courseHref} target="_blank" rel="noopener noreferrer">
            View Course
            <span className="sr-only">
              : {course.title} (opens in a new tab)
            </span>
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </SecondaryButton>
      </CardFooter>
    </Card>
  )
}
