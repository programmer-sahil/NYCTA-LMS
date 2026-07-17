import { FeatureCard } from '@/components/shared/feature-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { homeContent } from '@/content/home'

import { getHomeIcon } from './home-icon'
import { HomeSection } from './home-section'

export function HybridLearningSection() {
  const { hybridLearning } = homeContent

  return (
    <HomeSection id="hybrid-learning" aria-labelledby="hybrid-learning-title">
      <SectionHeading
        headingId="hybrid-learning-title"
        eyebrow={hybridLearning.eyebrow}
        title={hybridLearning.title}
        description={hybridLearning.description}
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hybridLearning.features.map((feature) => (
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
