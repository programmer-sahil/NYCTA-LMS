import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { CourseBadge } from '@/components/shared/course-badge'
import { SecondaryButton } from '@/components/shared/secondary-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { FeaturedCourse } from '@/content/home'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: FeaturedCourse
  number: number
}

const accentClasses = {
  cyan: 'from-primary/20 via-primary/5 text-primary',
  violet:
    'from-secondary-foreground/18 via-secondary/20 text-secondary-foreground',
  emerald: 'from-success/18 via-success/5 text-success',
  amber:
    'from-warning/18 via-warning/5 text-warning-foreground dark:text-warning',
} as const

export function CourseCard({ course, number }: CourseCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-border/80 bg-card/80 shadow-none transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-black/5">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent opacity-75',
          accentClasses[course.accent],
        )}
        aria-hidden="true"
      />
      <CardHeader className="relative">
        <div className="flex items-center justify-between gap-3">
          <CourseBadge tone={course.accent}>Official learning path</CourseBadge>
          <span className="font-mono text-xs text-muted-foreground">
            {String(number).padStart(2, '0')}
          </span>
        </div>
        <CardTitle className="mt-5 text-xl tracking-tight">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {course.description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {course.topics.map((topic) => (
            <li key={topic} className="flex items-center gap-2 text-sm">
              <CheckCircle2
                className="size-4 shrink-0 text-success"
                aria-hidden="true"
              />
              {topic}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative border-t border-border/70 pt-4">
        <SecondaryButton asChild className="w-full justify-between">
          <a href="tel:7003573290">
            Ask about this course
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </a>
        </SecondaryButton>
      </CardFooter>
    </Card>
  )
}
