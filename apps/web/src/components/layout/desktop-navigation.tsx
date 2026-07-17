'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PrimaryButton } from '@/components/shared/primary-button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function DesktopNavigation() {
  const pathname = usePathname()

  return (
    <nav
      className="hidden items-center gap-0.5 xl:flex"
      aria-label="Primary navigation"
    >
      {siteConfig.navigation.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === item.href
            : pathname.startsWith(item.href)

        if ('emphasis' in item && item.emphasis) {
          return (
            <PrimaryButton key={item.href} asChild className="ml-2">
              <Link href={item.href}>{item.label}</Link>
            </PrimaryButton>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-offset-0',
              isActive && 'bg-muted text-foreground',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
