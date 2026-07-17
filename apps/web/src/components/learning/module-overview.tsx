import {
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Library,
} from 'lucide-react'
import Link from 'next/link'

import { CourseSidebar } from '@/components/learning/course-sidebar'
import { ModuleNavigation } from '@/components/learning/module-navigation'
import { Container } from '@/components/shared/container'
import { CourseBadge } from '@/components/shared/course-badge'
import { EmptyState } from '@/components/states/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Course, CourseModule } from '@/content/courses'

interface ModuleOverviewProps {
  course: Course
  courseModule: CourseModule
}

export function ModuleOverview({ course, courseModule }: ModuleOverviewProps) {
  const availableLessons = courseModule.lessons.filter(
    (lesson) => lesson.published,
  )
  const estimatedMinutes = availableLessons.reduce(
    (total, lesson) => total + lesson.estimatedMinutes,
    0,
  )

  return (
    <article className="py-10 sm:py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/courses/${course.slug}`}>{course.shortTitle}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {courseModule.title}
            </li>
          </ol>
        </nav>

        <div className="mt-6">
          <ModuleNavigation
            course={course}
            activeModuleSlug={courseModule.slug}
          />
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <CourseSidebar
            course={course}
            activeModuleSlug={courseModule.slug}
            className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:sticky lg:top-28 lg:block"
          />

          <div className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <CourseBadge tone={course.theme}>
                  {course.shortTitle}
                </CourseBadge>
                <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {availableLessons.length} available lessons
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {courseModule.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                {courseModule.summary}
              </p>
            </header>

            <section
              className="mt-8 grid gap-4 sm:grid-cols-2"
              aria-label="Module summary"
            >
              <Card className="bg-card/65 shadow-none">
                <CardContent className="flex items-center gap-3 py-5">
                  <Clock3 className="size-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Estimated study time
                    </p>
                    <p className="mt-1 font-semibold">
                      {estimatedMinutes > 0
                        ? `${estimatedMinutes} minutes`
                        : 'To be confirmed'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/65 shadow-none">
                <CardContent className="py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Module progress</p>
                    <span className="text-xs text-muted-foreground">
                      0% placeholder
                    </span>
                  </div>
                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label="Module progress placeholder"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={0}
                  >
                    <div className="h-full w-0 bg-primary" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mt-12" aria-labelledby="lesson-list-title">
              <h2
                id="lesson-list-title"
                className="text-2xl font-semibold tracking-tight"
              >
                Lessons
              </h2>
              {availableLessons.length > 0 ? (
                <ol className="mt-5 space-y-3">
                  {availableLessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/courses/${course.slug}/${courseModule.slug}/${lesson.slug}`}
                        className="group flex items-start gap-4 rounded-xl border border-border bg-card/65 p-4 transition-colors hover:border-primary/35 hover:bg-card sm:p-5"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold">
                              {lesson.title}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-success">
                              <CheckCircle2
                                className="size-3.5"
                                aria-hidden="true"
                              />{' '}
                              Available
                            </span>
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                            {lesson.summary}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock3 className="size-3.5" aria-hidden="true" />
                            {lesson.estimatedMinutes} minutes
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    icon={BookOpenCheck}
                    title="Lessons are being prepared"
                    description="Lesson content will be added by the instructor."
                  />
                </div>
              )}
            </section>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <section aria-labelledby="module-resources-title">
                <h2 id="module-resources-title" className="sr-only">
                  Module resources
                </h2>
                <EmptyState
                  icon={Library}
                  title="Module resources coming soon"
                  description="Resources will be added by the instructor."
                />
              </section>
              <section aria-labelledby="module-project-title">
                <Card className="h-full border-primary/20 bg-primary/5 shadow-none">
                  <CardHeader>
                    <FolderKanban
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                    <CardTitle id="module-project-title" className="mt-2">
                      {courseModule.project?.title ??
                        'Module project coming soon'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-muted-foreground">
                    {courseModule.project?.description ??
                      'Project tasks will be added by the instructor.'}
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}
