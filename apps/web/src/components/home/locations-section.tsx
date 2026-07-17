import { MapPin, MapPinned } from 'lucide-react'

import { ContactButton } from '@/components/shared/contact-button'
import { SectionHeading } from '@/components/shared/section-heading'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { homeContent } from '@/content/home'

import { HomeSection } from './home-section'

export function LocationsSection() {
  const { locations } = homeContent

  return (
    <HomeSection id="locations" aria-labelledby="locations-title">
      <SectionHeading
        headingId="locations-title"
        eyebrow={locations.eyebrow}
        title={locations.title}
        description={locations.description}
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {locations.items.map((location) => (
          <Card
            key={location.name}
            className="overflow-hidden border-border/80 bg-card/80 shadow-none"
          >
            <div
              className="relative h-36 overflow-hidden border-b border-border bg-muted/35"
              role="img"
              aria-label={`${location.name} map placeholder`}
            >
              <div className="home-map-grid absolute inset-0 opacity-70" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-12 place-items-center rounded-full border border-primary/30 bg-background/90 text-primary shadow-lg">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute right-3 bottom-3 rounded-md border border-border bg-background/85 px-2 py-1 font-mono text-[0.62rem] text-muted-foreground uppercase">
                Map link placeholder
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{location.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{location.region}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                <MapPinned
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{location.addressPlaceholder}</span>
              </div>
              <div className="mt-5 flex flex-col gap-2 min-[430px]:flex-row">
                <ContactButton
                  phoneNumber={location.phoneNumber}
                  label={`Call ${location.phoneNumber}`}
                />
                <WhatsAppButton
                  phoneNumber={siteConfig.whatsappNumber}
                  label="WhatsApp Us"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </HomeSection>
  )
}
