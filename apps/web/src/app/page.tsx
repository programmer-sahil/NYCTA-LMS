import type { Metadata } from 'next'

import { AboutSection } from '@/components/home/about-section'
import { CourseCategoryChips } from '@/components/home/course-category-chips'
import { FeaturedCoursesSection } from '@/components/home/featured-courses-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { HeroSection } from '@/components/home/hero-section'
import { HybridLearningSection } from '@/components/home/hybrid-learning-section'
import { LearningComparisonSection } from '@/components/home/learning-comparison-section'
import { LearningJourneySection } from '@/components/home/learning-journey-section'
import { LocationsSection } from '@/components/home/locations-section'
import { ProjectLearningSection } from '@/components/home/project-learning-section'
import { WhyChooseSection } from '@/components/home/why-choose-section'
import { siteConfig } from '@/config/site'
import { homeContent } from '@/content/home'

const pageDescription = homeContent.hero.description

export const metadata: Metadata = {
  title: 'Practical Technology Courses and Hybrid Learning',
  description: pageDescription,
  openGraph: {
    title: `${siteConfig.name} | Practical Technology Learning`,
    description: pageDescription,
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
  },
}

const educationalOrganizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  telephone: siteConfig.phoneNumbers,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: `${siteConfig.district}, ${siteConfig.state}`,
  },
  location: siteConfig.locations.map((location) => ({
    '@type': 'Place',
    name: `${siteConfig.shortName} ${location}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressRegion: siteConfig.state,
      addressCountry: 'IN',
    },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalOrganizationJsonLd),
        }}
      />
      <HeroSection />
      <CourseCategoryChips />
      <HybridLearningSection />
      <FeaturedCoursesSection />
      <WhyChooseSection />
      <LearningJourneySection />
      <ProjectLearningSection />
      <LearningComparisonSection />
      <LocationsSection />
      <AboutSection />
      <FinalCtaSection />
    </>
  )
}
