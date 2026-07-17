'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LogoMark } from '@/components/shared/logo-mark'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(22rem,90vw)] border-border bg-background p-0">
        <SheetHeader className="border-b border-border p-5 text-left">
          <div className="flex items-center gap-3 pr-10">
            <LogoMark />
            <div>
              <SheetTitle className="font-semibold">
                {siteConfig.shortName}
              </SheetTitle>
              <SheetDescription>Learning platform navigation</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
          {siteConfig.navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href)

            return (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                    isActive && 'bg-muted text-foreground',
                    'emphasis' in item &&
                      item.emphasis &&
                      'mt-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
