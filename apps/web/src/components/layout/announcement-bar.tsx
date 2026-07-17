import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/container'
import { homeContent } from '@/content/home'

export function AnnouncementBar() {
  const { announcement } = homeContent

  return (
    <aside
      className="border-b border-primary/20 bg-primary/10"
      aria-label="Admissions announcement"
    >
      <Container className="flex min-h-10 flex-col items-center justify-center gap-2 py-2 text-center text-xs sm:flex-row sm:gap-4 sm:text-sm">
        <p className="font-medium text-foreground">{announcement.message}</p>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={announcement.primaryAction.href}
            className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
          >
            {announcement.primaryAction.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <a
            href={announcement.secondaryAction.href}
            className="inline-flex items-center gap-1 font-semibold text-foreground underline-offset-4 hover:underline"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {announcement.secondaryAction.label}
          </a>
        </div>
      </Container>
    </aside>
  )
}
