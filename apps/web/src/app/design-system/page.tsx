import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { BookOpenCheck, BriefcaseBusiness, MonitorPlay } from 'lucide-react'

import { ContactButton } from '@/components/shared/contact-button'
import { Container } from '@/components/shared/container'
import { CourseBadge } from '@/components/shared/course-badge'
import { FeatureCard } from '@/components/shared/feature-card'
import { GradientText } from '@/components/shared/gradient-text'
import { LogoMark } from '@/components/shared/logo-mark'
import { PrimaryButton } from '@/components/shared/primary-button'
import { SecondaryButton } from '@/components/shared/secondary-button'
import { SectionHeading } from '@/components/shared/section-heading'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { EmptyState } from '@/components/states/empty-state'
import { ErrorState } from '@/components/states/error-state'
import { LoadingSkeleton } from '@/components/states/loading-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Design System Preview',
  description:
    'Internal development preview of the NYCTA frontend design system.',
  robots: { index: false, follow: false },
}

const colorTokens = [
  { name: 'Background', className: 'bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Card', className: 'bg-card' },
  { name: 'Muted', className: 'bg-muted' },
  { name: 'Border', className: 'bg-border' },
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
  { name: 'Success', className: 'bg-success' },
  { name: 'Warning', className: 'bg-warning' },
  { name: 'Destructive', className: 'bg-destructive' },
] as const

export default function DesignSystemPage() {
  return (
    <div className="pb-24">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CourseBadge tone="amber">Development preview</CourseBadge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              NYCTA <GradientText>design system</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Internal reference for reusable typography, color, components, and
              interface states. This is not a public landing page.
            </p>
          </div>
          <SecondaryButton asChild>
            <Link href="/">Return to setup page</Link>
          </SecondaryButton>
        </div>
      </Container>

      <PreviewSection
        id="identity"
        eyebrow="01 · Identity"
        title="A focused learning interface"
        description="Clear hierarchy, restrained accents, and accessible contrast for first-time and returning learners."
      >
        <Card className="bg-card/70 shadow-none">
          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <LogoMark className="size-14 rounded-2xl" />
            <div>
              <p className="text-xl font-semibold">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.shortName} · {siteConfig.locations.join(' + ')} ·
                Hybrid learning
              </p>
            </div>
          </CardContent>
        </Card>
      </PreviewSection>

      <PreviewSection
        id="typography"
        eyebrow="02 · Typography"
        title="Readable at every level"
        description="Geist Sans keeps instruction approachable while Geist Mono labels technical details."
      >
        <Card className="bg-card/70 shadow-none">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                Display / 48
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                Learn with confidence.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                Heading / 32
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                Practical computer education
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                Body / 16
              </p>
              <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
                Strong readability supports focused learning across phones,
                tablets, laptops, and classroom displays.
              </p>
            </div>
          </CardContent>
        </Card>
      </PreviewSection>

      <PreviewSection
        id="tokens"
        eyebrow="03 · Color tokens"
        title="Dark-first, balanced in light"
        description="Navy surfaces are supported by restrained cyan, violet, emerald, and amber accents."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="rounded-xl border border-border bg-card p-3"
            >
              <div
                className={`h-14 rounded-lg border border-border ${token.className}`}
              />
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {token.name}
              </p>
            </div>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection
        id="actions"
        eyebrow="04 · Actions"
        title="Clear next steps"
        description="Primary actions carry emphasis; secondary and contact actions remain easy to distinguish."
      >
        <div className="flex flex-wrap gap-3">
          <PrimaryButton>Primary action</PrimaryButton>
          <SecondaryButton>Secondary action</SecondaryButton>
          <ContactButton phoneNumber={siteConfig.phoneNumbers[0]} />
          <WhatsAppButton phoneNumber={siteConfig.whatsappNumber} />
        </div>
      </PreviewSection>

      <PreviewSection
        id="badges"
        eyebrow="05 · Badges"
        title="Quiet categorisation"
        description="Course and content labels use color purposefully without competing with the page hierarchy."
      >
        <div className="flex flex-wrap gap-3">
          <CourseBadge>Web fundamentals</CourseBadge>
          <CourseBadge tone="violet">Recorded lessons</CourseBadge>
          <CourseBadge tone="emerald">Project ready</CourseBadge>
          <CourseBadge tone="amber">Revision material</CourseBadge>
        </div>
      </PreviewSection>

      <PreviewSection
        id="features"
        eyebrow="06 · Feature cards"
        title="Reusable learning surfaces"
        description="Cards organise concise information without unnecessary layering or visual effects."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={BookOpenCheck}
            title="Structured learning"
            description="Clear course material designed to help beginners progress one concept at a time."
          />
          <FeatureCard
            icon={MonitorPlay}
            title="Hybrid support"
            description="Classroom instruction is supported by recorded material and revision resources."
            accent="violet"
          />
          <FeatureCard
            icon={BriefcaseBusiness}
            title="Career practice"
            description="Projects and interview preparation connect learning with practical outcomes."
            accent="emerald"
          />
        </div>
      </PreviewSection>

      <PreviewSection
        id="states"
        eyebrow="07 · Interface states"
        title="Designed beyond the happy path"
        description="Loading, empty, and error experiences communicate status without blaming or confusing learners."
      >
        <div className="space-y-5">
          <LoadingSkeleton />
          <div className="grid gap-5 lg:grid-cols-2">
            <EmptyState
              title="No course materials yet"
              description="Materials will appear here once they are published for this course."
              action={<SecondaryButton>Browse courses</SecondaryButton>}
            />
            <ErrorState description="The preview could not load this example content. Try again shortly." />
          </div>
        </div>
      </PreviewSection>
    </div>
  )
}

interface PreviewSectionProps {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

function PreviewSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: PreviewSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  )
}
