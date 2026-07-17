import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Laptop2,
  MapPin,
  MessageCircleQuestion,
  Phone,
  Route,
  Sparkles,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'

import { ContactButton } from '@/components/shared/contact-button'
import { Container } from '@/components/shared/container'
import { CourseBadge } from '@/components/shared/course-badge'
import { PrimaryButton } from '@/components/shared/primary-button'
import { SecondaryButton } from '@/components/shared/secondary-button'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { EmptyState } from '@/components/states/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import type { Course } from '@/content/courses'
import { getAdjacentCourses } from '@/content/courses'
import { cn } from '@/lib/utils'

import { CourseIcon } from './course-icon'

interface CourseOverviewProps {
  course: Course
}

const themeClasses = {
  cyan: 'text-primary bg-primary/10 border-primary/20',
  violet:
    'text-secondary-foreground bg-secondary/55 border-secondary-foreground/15',
  emerald: 'text-success bg-success/10 border-success/20',
  amber:
    'text-warning-foreground dark:text-warning bg-warning/10 border-warning/20',
} as const

const summaryItems = [
  { key: 'level', label: 'Level', icon: GraduationCap },
  { key: 'learningMode', label: 'Learning mode', icon: Laptop2 },
  { key: 'durationLabel', label: 'Duration', icon: Clock3 },
] as const

export function CourseOverview({ course }: CourseOverviewProps) {
  const adjacentCourses = getAdjacentCourses(course.slug)

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border py-12 sm:py-16 lg:py-20">
        <div
          className="home-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute -top-28 right-0 size-96 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  href="/courses"
                >
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                {course.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'grid size-12 place-items-center rounded-2xl border',
                  themeClasses[course.theme],
                )}
              >
                <CourseIcon name={course.icon} className="size-6" />
              </span>
              <CourseBadge tone={course.theme}>{course.category}</CourseBadge>
              <CourseBadge tone={course.theme}>{course.level}</CourseBadge>
            </div>
            <h1 className="mt-7 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {course.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton asChild>
                <a href="#enquire">
                  Enquire about this course
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </a>
              </PrimaryButton>
              <SecondaryButton asChild>
                <a href="#modules">Explore modules</a>
              </SecondaryButton>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="course-summary-title">
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                Course summary
              </p>
              <h2
                id="course-summary-title"
                className="mt-3 text-3xl font-semibold tracking-tight"
              >
                A guided introduction to {course.shortTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                {course.description}
              </p>
              <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                {summaryItems.map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-card/60 p-4"
                  >
                    <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium">{course[key]}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              className="grid gap-5 md:grid-cols-2"
              aria-label="Course suitability and learning outcomes"
            >
              <Card className="border-border/80 bg-card/65 shadow-none">
                <CardHeader>
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Route className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="mt-3 text-xl">
                    Beginner suitability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {course.beginnerSuitability}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/80 bg-card/65 shadow-none">
                <CardHeader>
                  <span className="grid size-10 place-items-center rounded-xl bg-success/10 text-success">
                    <BookOpenCheck className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="mt-3 text-xl">
                    Draft learning outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.learningOutcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 leading-6"
                      >
                        <CheckCircle2
                          className="mt-1 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section
              id="modules"
              aria-labelledby="modules-title"
              className="scroll-mt-28"
            >
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                Starter curriculum
              </p>
              <h2
                id="modules-title"
                className="mt-3 text-3xl font-semibold tracking-tight"
              >
                Module overview
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                These module summaries are placeholders for curriculum planning.
                Detailed lessons will be added in a future phase.
              </p>
              {course.modules.length > 0 ? (
                <ol className="mt-7 grid gap-4 sm:grid-cols-2">
                  {course.modules.map((module, index) => (
                    <li key={module.id}>
                      <Link
                        href={`/courses/${course.slug}/${module.slug}`}
                        className="group block h-full rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-none"
                        aria-label={`${module.title}, planned module`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-xs text-primary">
                            Module {String(index + 1).padStart(2, '0')}
                          </span>
                          <ArrowRight
                            className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="mt-3 font-semibold">{module.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {module.summary}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-7">
                  <EmptyState
                    title="Modules are being planned"
                    description="Module summaries will appear here after curriculum review."
                  />
                </div>
              )}
            </section>

            <section aria-labelledby="projects-title">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-none">
                <CardHeader>
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle id="projects-title" className="mt-3 text-2xl">
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">
                    {course.projectPlaceholder.label}
                  </h3>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {course.projectPlaceholder.description}
                  </p>
                </CardContent>
              </Card>
            </section>

            <section
              className="grid gap-5 md:grid-cols-3"
              aria-label="Course details"
            >
              <CourseDetailCard
                title="Learning format"
                icon={Laptop2}
                items={course.learningFormat}
              />
              <CourseDetailCard
                title="Prerequisites"
                icon={MessageCircleQuestion}
                items={course.prerequisites}
              />
              <CourseDetailCard
                title="Tools and technologies"
                icon={Wrench}
                items={course.toolsAndTechnologies}
              />
            </section>

            {course.interviewPreparation ? (
              <section aria-labelledby="interview-title">
                <div className="rounded-2xl border border-success/20 bg-success/5 p-6 sm:p-8">
                  <p className="font-mono text-xs font-semibold tracking-[0.16em] text-success uppercase">
                    Career preparation
                  </p>
                  <h2
                    id="interview-title"
                    className="mt-3 text-2xl font-semibold"
                  >
                    Interview-preparation support
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    The planned course includes concept revision, practice
                    questions, project discussion, and support for explaining
                    technical work. It does not promise a job or a particular
                    interview outcome.
                  </p>
                </div>
              </section>
            ) : null}

            <section aria-labelledby="more-courses-title">
              <Separator />
              <h2
                id="more-courses-title"
                className="mt-10 text-2xl font-semibold"
              >
                Continue exploring courses
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {adjacentCourses.previous ? (
                  <Link
                    href={`/courses/${adjacentCourses.previous.slug}`}
                    className="group rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/35"
                  >
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowLeft className="size-4" aria-hidden="true" />{' '}
                      Previous course
                    </span>
                    <span className="mt-3 block font-semibold">
                      {adjacentCourses.previous.shortTitle}
                    </span>
                  </Link>
                ) : null}
                {adjacentCourses.next ? (
                  <Link
                    href={`/courses/${adjacentCourses.next.slug}`}
                    className="group rounded-xl border border-border bg-card/60 p-5 text-right transition-colors hover:border-primary/35"
                  >
                    <span className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                      Next course{' '}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                    <span className="mt-3 block font-semibold">
                      {adjacentCourses.next.shortTitle}
                    </span>
                  </Link>
                ) : null}
              </div>
            </section>
          </div>

          <aside id="enquire" className="scroll-mt-28 lg:sticky lg:top-28">
            <Card className="border-primary/25 bg-card shadow-xl shadow-black/5">
              <CardHeader>
                <CardTitle className="text-xl">Ask about admissions</CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">
                  Contact the institute for current batches, timings, fees, and
                  the confirmed course duration.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2">
                    <MapPin
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Bandel and Chandannagar
                  </p>
                  <p className="flex items-center gap-2">
                    <Laptop2
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    {course.learningMode}
                  </p>
                </div>
                <div className="grid gap-3">
                  <ContactButton
                    phoneNumber={siteConfig.phoneNumbers[0]}
                    label={`Call ${siteConfig.phoneNumbers[0]}`}
                  />
                  <WhatsAppButton
                    phoneNumber={siteConfig.whatsappNumber}
                    label="WhatsApp the institute"
                    className="w-full"
                  />
                  <SecondaryButton asChild className="w-full">
                    <a href={`tel:${siteConfig.phoneNumbers[1]}`}>
                      <Phone data-icon="inline-start" aria-hidden="true" />
                      Call {siteConfig.phoneNumbers[1]}
                    </a>
                  </SecondaryButton>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  Course details are preliminary and may be refined during
                  curriculum review.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </article>
  )
}

interface CourseDetailCardProps {
  title: string
  icon: typeof Laptop2
  items: readonly string[]
}

function CourseDetailCard({ title, icon: Icon, items }: CourseDetailCardProps) {
  return (
    <Card className="h-full border-border/80 bg-card/60 shadow-none">
      <CardHeader>
        <Icon className="size-5 text-primary" aria-hidden="true" />
        <CardTitle className="mt-2 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-1 size-3.5 shrink-0 text-success"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Details coming soon.</p>
        )}
      </CardContent>
    </Card>
  )
}
