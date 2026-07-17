import Link from 'next/link'

import { Container } from '@/components/shared/container'
import { LogoMark } from '@/components/shared/logo-mark'
import { siteConfig } from '@/config/site'

import { DesktopNavigation } from './desktop-navigation'
import { MobileNavigation } from './mobile-navigation'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 supports-[backdrop-filter]:bg-background/88 supports-[backdrop-filter]:backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-offset-4"
          aria-label={`${siteConfig.shortName} home`}
        >
          <LogoMark />
          <span className="min-w-0">
            <span className="block text-base leading-none font-semibold tracking-tight">
              {siteConfig.shortName}
            </span>
            <span className="mt-1 hidden truncate text-[0.68rem] leading-none text-muted-foreground sm:block">
              {siteConfig.name}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <DesktopNavigation />
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
