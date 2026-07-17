import { Check, Minus } from 'lucide-react'

import { CourseBadge } from '@/components/shared/course-badge'
import { SectionHeading } from '@/components/shared/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

export function LearningComparisonSection() {
  const { comparison } = homeContent

  return (
    <HomeSection
      id="learning-comparison"
      className="border-y border-border bg-card/25"
      aria-labelledby="learning-comparison-title"
    >
      <SectionHeading
        headingId="learning-comparison-title"
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        description={comparison.description}
        align="center"
      />

      <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
        <span
          className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[0.65rem] text-muted-foreground lg:block"
          aria-hidden="true"
        >
          compare
        </span>
        <ComparisonCard
          title={comparison.traditional.title}
          label="Unstructured"
          points={comparison.traditional.points}
          variant="traditional"
        />
        <ComparisonCard
          title={comparison.guided.title}
          label="Guided hybrid"
          points={comparison.guided.points}
          variant="guided"
        />
      </div>
    </HomeSection>
  )
}

interface ComparisonCardProps {
  title: string
  label: string
  points: readonly string[]
  variant: 'traditional' | 'guided'
}

function ComparisonCard({
  title,
  label,
  points,
  variant,
}: ComparisonCardProps) {
  const isGuided = variant === 'guided'

  return (
    <Card
      className={
        isGuided
          ? 'border-success/30 bg-success/5 shadow-none'
          : 'border-border bg-background/60 shadow-none'
      }
    >
      <CardHeader>
        <CourseBadge tone={isGuided ? 'emerald' : 'amber'}>{label}</CourseBadge>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-6"
            >
              <span
                className={
                  isGuided
                    ? 'mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success'
                    : 'mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground'
                }
              >
                {isGuided ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  <Minus className="size-3.5" aria-hidden="true" />
                )}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
