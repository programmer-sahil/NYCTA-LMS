import { ArrowRight, Check, PhoneCall, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/container'
import { GradientText } from '@/components/shared/gradient-text'
import { PrimaryButton } from '@/components/shared/primary-button'
import { SecondaryButton } from '@/components/shared/secondary-button'
import { homeContent } from '@/content/home'

export function HeroSection() {
  const { hero, categories } = homeContent

  return (
    <section className="relative isolate overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-12 left-[8%] size-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-[5%] bottom-10 size-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="home-grid absolute inset-0 opacity-40" />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 font-mono text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
            Build Job-Ready Technology Skills with{' '}
            <GradientText>Practical, AI-Assisted Learning</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <PrimaryButton asChild className="h-11 px-5">
              <Link href={hero.primaryAction.href}>
                {hero.primaryAction.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </PrimaryButton>
            <SecondaryButton asChild className="h-11 px-5">
              <a href={hero.secondaryAction.href}>
                <PhoneCall data-icon="inline-start" aria-hidden="true" />
                {hero.secondaryAction.label}
              </a>
            </SecondaryButton>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {hero.trustIndicators.map((indicator) => (
              <li key={indicator} className="flex items-center gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {indicator}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mx-auto w-full max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-700 lg:mx-0"
          aria-label="Abstract learning pathway illustration"
          role="img"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/12 via-secondary/12 to-success/8 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl shadow-black/10">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Guided learning path
                </p>
                <p className="mt-1 text-sm font-semibold">
                  From foundation to portfolio
                </p>
              </div>
              <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[0.65rem] text-success">
                Hybrid
              </span>
            </div>
            <div className="space-y-3 p-5 sm:p-6">
              {categories.slice(0, 4).map((category, index) => (
                <div
                  key={category}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background/55 p-3.5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{category}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                        style={{ width: `${35 + index * 14}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border bg-muted/30 px-5 py-3 text-center font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase">
              CSS-generated learning interface · no stock imagery
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
