import { BookOpen, CheckCircle2, Circle, Layers3 } from 'lucide-react'
import Link from 'next/link'

import type { Course } from '@/content/courses'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
  course: Course
  activeModuleSlug?: string
  activeLessonSlug?: string
  className?: string
}

export function CourseSidebar({
  course,
  activeModuleSlug,
  activeLessonSlug,
  className,
}: CourseSidebarProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-border bg-card/65 p-4',
        className,
      )}
      aria-label="Course navigation"
    >
      <Link
        href={`/courses/${course.slug}`}
        className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Layers3 className="size-4" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs text-muted-foreground">
            Course overview
          </span>
          <span className="mt-1 block text-sm font-semibold leading-5">
            {course.shortTitle}
          </span>
        </span>
      </Link>

      <nav className="mt-4" aria-label={`${course.shortTitle} modules`}>
        <ol className="space-y-1">
          {course.modules.map((courseModule, index) => {
            const isActive = courseModule.slug === activeModuleSlug

            return (
              <li key={courseModule.id}>
                <Link
                  href={`/courses/${course.slug}/${courseModule.slug}`}
                  aria-current={
                    isActive && !activeLessonSlug ? 'page' : undefined
                  }
                  className={cn(
                    'flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                    isActive && 'bg-muted text-foreground',
                  )}
                >
                  <span className="mt-0.5 font-mono text-[0.68rem] text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-5">{courseModule.title}</span>
                </Link>

                {isActive && courseModule.lessons.length > 0 ? (
                  <ol className="mt-1 ml-7 space-y-1 border-l border-border pl-3">
                    {courseModule.lessons.map((lesson) => {
                      const isLessonActive = lesson.slug === activeLessonSlug

                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/courses/${course.slug}/${courseModule.slug}/${lesson.slug}`}
                            aria-current={isLessonActive ? 'page' : undefined}
                            className={cn(
                              'flex items-start gap-2 rounded-md px-2 py-2 text-xs leading-5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                              isLessonActive && 'bg-primary/10 text-foreground',
                            )}
                          >
                            {lesson.published ? (
                              <CheckCircle2
                                className="mt-0.5 size-3.5 shrink-0 text-success"
                                aria-hidden="true"
                              />
                            ) : (
                              <Circle
                                className="mt-0.5 size-3.5 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            {lesson.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                ) : null}
              </li>
            )
          })}
        </ol>
      </nav>

      <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <BookOpen className="size-3.5" aria-hidden="true" />
        Curriculum preview
      </p>
    </aside>
  )
}
