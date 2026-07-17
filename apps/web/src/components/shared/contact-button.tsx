import { Phone } from 'lucide-react'

import { SecondaryButton } from '@/components/shared/secondary-button'

interface ContactButtonProps {
  phoneNumber: string
  label?: string
}

export function ContactButton({
  phoneNumber,
  label = 'Call NYCTA',
}: ContactButtonProps) {
  return (
    <SecondaryButton asChild>
      <a href={`tel:${phoneNumber}`}>
        <Phone data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </SecondaryButton>
  )
}
