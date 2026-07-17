import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ScrollToTop } from '@/components/shared/scroll-to-top'
import { SkipToContent } from '@/components/shared/skip-to-content'
import { siteConfig } from '@/config/site'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} LMS`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SkipToContent />
          <AnnouncementBar />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
