import { SectionHeading } from '@/components/shared/section-heading'
import { homeContent } from '@/content/home'

import { HomeIcon } from './home-icon'
import { HomeSection } from './home-section'

export function LearningJourneySection() {
  const { journey } = homeContent

  return (
    <HomeSection
      id="learning-journey"
      className="border-y border-border bg-card/25"
      aria-labelledby="learning-journey-title"
    >
      <SectionHeading
        headingId="learning-journey-title"
        eyebrow={journey.eyebrow}
        title={journey.title}
        description={journey.description}
        align="center"
      />

      <ol className="relative mt-12 grid gap-x-6 gap-y-0 before:absolute before:top-6 before:right-[12%] before:left-[12%] before:hidden before:h-px before:bg-gradient-to-r before:from-primary/20 before:via-primary/70 before:to-success/30 md:grid-cols-3 md:gap-y-10 md:before:block">
        {journey.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-8 last:pb-0 md:block md:pb-0 md:text-center"
          >
            {index < journey.steps.length - 1 ? (
              <span
                className="absolute top-11 bottom-0 left-[1.35rem] w-px bg-border md:hidden"
                aria-hidden="true"
              />
            ) : null}
            <span className="relative z-10 grid size-11 place-items-center rounded-xl border border-primary/30 bg-background text-primary shadow-sm md:mx-auto">
              <HomeIcon name={step.icon} className="size-5" />
            </span>
            <div className="pt-0.5 md:mt-5 md:pt-0">
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-primary uppercase">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </HomeSection>
  )
}
