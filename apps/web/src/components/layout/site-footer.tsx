import {
  Camera,
  Clock,
  MessagesSquare,
  Mail,
  MapPin,
  Network,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/container'
import { LogoMark } from '@/components/shared/logo-mark'
import { ContactButton } from '@/components/shared/contact-button'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'

const courseLinks = [
  { label: 'All Courses', href: '/#featured-courses' },
  { label: 'Learning Roadmaps', href: '/#learning-journey' },
  { label: 'Student Projects', href: '/#projects' },
]

const resourceLinks = [
  { label: 'Learn', href: '/#hybrid-learning' },
  { label: 'Revision Materials', href: '/#hybrid-learning' },
  { label: 'Practice Questions', href: '/#hybrid-learning' },
  { label: 'Student Login', href: '/student/login' },
]

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

const socialIcons: Record<string, LucideIcon> = {
  Facebook: MessagesSquare,
  Instagram: Camera,
  YouTube: Video,
  LinkedIn: Network,
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/35">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_2fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div>
                <p className="font-semibold">{siteConfig.shortName}</p>
                <p className="text-xs text-muted-foreground">
                  Hybrid learning in Hooghly
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {siteConfig.name} supports beginner-friendly computer education
              with practical learning and career preparation.
            </p>
            <div
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Social links coming soon"
            >
              {siteConfig.socialLinks.map((social) => {
                const Icon = socialIcons[social.label]

                return (
                  <span
                    key={social.label}
                    className="grid size-9 cursor-not-allowed place-items-center rounded-lg border border-border bg-muted/60 text-muted-foreground"
                    aria-label={`${social.label} link coming soon`}
                    role="img"
                    title={`${social.label} link coming soon`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            <FooterLinkGroup title="Courses" links={courseLinks} />
            <FooterLinkGroup title="Student Resources" links={resourceLinks} />
            <div>
              <h2 className="text-sm font-semibold">Locations</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {siteConfig.locations.map((location) => (
                  <li key={location} className="flex items-start gap-2">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{location}</span>
                  </li>
                ))}
                <li>
                  {siteConfig.district}, {siteConfig.state}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </li>
                <li className="flex gap-2">
                  <Clock
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.openingHours}</span>
                </li>
              </ul>
            </div>
            <FooterLinkGroup title="Legal" links={legalLinks} />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 min-[420px]:flex-row">
            <ContactButton
              phoneNumber={siteConfig.phoneNumbers[0]}
              label={siteConfig.phoneNumbers[0]}
            />
            <WhatsAppButton phoneNumber={siteConfig.whatsappNumber} />
          </div>
        </div>
      </Container>
    </footer>
  )
}

interface FooterLinkGroupProps {
  title: string
  links: readonly { label: string; href: string }[]
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
