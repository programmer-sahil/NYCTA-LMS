import { FeatureCard } from '@/components/shared/feature-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { homeContent } from '@/content/home'

import { getHomeIcon } from './home-icon'
import { HomeSection } from './home-section'

export function WhyChooseSection() {
  const { whyNycti } = homeContent

  return (
    <HomeSection id="why-nycti" aria-labelledby="why-nycti-title">
      <SectionHeading
        headingId="why-nycti-title"
        eyebrow={whyNycti.eyebrow}
        title={whyNycti.title}
        description={whyNycti.description}
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyNycti.features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={getHomeIcon(feature.icon)}
            title={feature.title}
            description={feature.description}
            accent={feature.accent}
          />
        ))}
      </div>
    </HomeSection>
  )
}
