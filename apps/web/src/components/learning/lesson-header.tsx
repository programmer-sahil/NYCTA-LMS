import { Clock3, Gauge } from 'lucide-react'

import { CourseBadge } from '@/components/shared/course-badge'
import type { CourseModule, Lesson } from '@/content/courses'

interface LessonHeaderProps {
  courseModule: CourseModule
  lesson: Lesson
}

export function LessonHeader({ courseModule, lesson }: LessonHeaderProps) {
  return (
    <header className="border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-2">
        <CourseBadge tone="cyan">{courseModule.title}</CourseBadge>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
          <Gauge className="size-3.5" aria-hidden="true" />
          {lesson.difficulty}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {lesson.estimatedMinutes} minutes
        </span>
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {lesson.title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
        {lesson.summary}
      </p>
    </header>
  )
}
