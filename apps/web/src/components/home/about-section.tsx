import { BookOpenCheck, CirclePlay, FolderCode, UsersRound } from 'lucide-react'

import { CourseBadge } from '@/components/shared/course-badge'
import { SectionHeading } from '@/components/shared/section-heading'
import { Card } from '@/components/ui/card'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

const supportItems = [
  { label: 'Classroom guidance', icon: UsersRound },
  { label: 'Recorded learning materials', icon: CirclePlay },
  { label: 'Practice and revision', icon: BookOpenCheck },
  { label: 'Practical projects', icon: FolderCode },
] as const

export function AboutSection() {
  const { about } = homeContent

  return (
    <HomeSection
      id="about"
      className="border-y border-border bg-card/25"
      containerClassName="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      aria-labelledby="about-title"
    >
      <div
        className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-background/65"
        role="img"
        aria-label="Institute learning environment illustration placeholder"
      >
        <div className="home-grid absolute inset-0 opacity-55" />
        <div className="absolute top-[18%] left-[12%] h-28 w-[76%] rounded-xl border border-primary/25 bg-card/85 shadow-xl" />
        <div className="absolute bottom-[18%] left-[20%] h-24 w-[60%] rounded-xl border border-success/25 bg-card/90 shadow-xl" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-xl border border-primary/30 bg-background text-primary">
              <BookOpenCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 rounded-md bg-background/85 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
              Institute visual placeholder
            </p>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          headingId="about-title"
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {supportItems.map((item, index) => {
            const Icon = item.icon

            return (
              <Card
                key={item.label}
                className="flex-row items-center gap-3 border-border/80 bg-background/60 p-4 shadow-none"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <CourseBadge tone={index % 2 === 0 ? 'cyan' : 'emerald'}>
                    Included
                  </CourseBadge>
                  <p className="mt-2 text-sm font-medium">{item.label}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </HomeSection>
  )
}
