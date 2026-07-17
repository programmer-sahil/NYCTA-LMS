import { ArrowUpRight } from 'lucide-react'

import { CourseBadge } from '@/components/shared/course-badge'
import { SectionHeading } from '@/components/shared/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

export function ProjectLearningSection() {
  const { projects } = homeContent

  return (
    <HomeSection id="projects" aria-labelledby="project-learning-title">
      <SectionHeading
        headingId="project-learning-title"
        eyebrow={projects.eyebrow}
        title={projects.title}
        description={projects.description}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {projects.items.map((project, index) => (
          <Card
            key={project.label}
            className="group overflow-hidden border-border/80 bg-card/75 shadow-none"
          >
            <div
              className="relative h-32 overflow-hidden border-b border-border bg-muted/40"
              aria-label={`${project.label} illustration placeholder`}
              role="img"
            >
              <div className="home-grid absolute inset-0 opacity-55" />
              <div className="absolute inset-5 rounded-xl border border-dashed border-primary/30 bg-background/45" />
              <span className="absolute inset-0 grid place-items-center font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                Project visual placeholder
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CourseBadge tone={project.accent}>
                  Stage {index + 1}
                </CourseBadge>
                <ArrowUpRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="mt-4 text-lg">{project.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
              <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/35 px-3 py-2 font-mono text-[0.68rem] text-muted-foreground">
                Project name intentionally not defined
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </HomeSection>
  )
}
