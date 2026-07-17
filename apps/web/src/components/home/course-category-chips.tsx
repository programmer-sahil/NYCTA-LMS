import { Code2 } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { CourseBadge } from '@/components/shared/course-badge'
import { homeContent } from '@/content/home'

const tones = ['cyan', 'violet', 'emerald', 'amber'] as const

export function CourseCategoryChips() {
  return (
    <section
      className="border-b border-border bg-card/25 py-7"
      aria-labelledby="course-categories-title"
    >
      <Container className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
        <h2
          id="course-categories-title"
          className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
        >
          <Code2 className="size-4 text-primary" aria-hidden="true" />
          Explore learning paths
        </h2>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {homeContent.categories.map((category, index) => (
            <li key={category}>
              <CourseBadge tone={tones[index % tones.length]}>
                {category}
              </CourseBadge>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
