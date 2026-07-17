import { ExternalLink, Library } from 'lucide-react'

import { EmptyState } from '@/components/states/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LearningResource } from '@/content/courses'

interface LessonResourcesProps {
  resources: readonly LearningResource[]
}

export function LessonResources({ resources }: LessonResourcesProps) {
  return (
    <section aria-labelledby="resources-title">
      <h2
        id="resources-title"
        className="text-2xl font-semibold tracking-tight"
      >
        Lesson resources
      </h2>
      {resources.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.id} className="bg-card/65 shadow-none">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {resource.description}
                </p>
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Open resource
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <EmptyState
            icon={Library}
            title="Resources coming soon"
            description="Downloads and supporting links will be added by the instructor."
          />
        </div>
      )}
    </section>
  )
}
