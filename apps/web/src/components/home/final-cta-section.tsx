import { ArrowRight, MessageSquareText } from 'lucide-react'
import Link from 'next/link'

import { GradientText } from '@/components/shared/gradient-text'
import { PrimaryButton } from '@/components/shared/primary-button'
import { SecondaryButton } from '@/components/shared/secondary-button'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

export function FinalCtaSection() {
  const { finalCta } = homeContent

  return (
    <HomeSection
      className="relative overflow-hidden"
      aria-labelledby="final-cta-title"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card px-5 py-12 text-center sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="home-grid absolute inset-0 opacity-35" />
          <div className="absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {finalCta.eyebrow}
          </p>
          <h2
            id="final-cta-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            <GradientText>{finalCta.title}</GradientText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {finalCta.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
            <PrimaryButton asChild className="h-11 px-5">
              <Link href={finalCta.primaryAction.href}>
                {finalCta.primaryAction.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </PrimaryButton>
            <SecondaryButton asChild className="h-11 px-5">
              <Link href={finalCta.secondaryAction.href}>
                <MessageSquareText
                  data-icon="inline-start"
                  aria-hidden="true"
                />
                {finalCta.secondaryAction.label}
              </Link>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </HomeSection>
  )
}
