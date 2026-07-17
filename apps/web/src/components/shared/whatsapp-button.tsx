import { MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phoneNumber: string
  label?: string
  className?: string
}

export function WhatsAppButton({
  phoneNumber,
  label = 'Chat on WhatsApp',
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        'h-10 rounded-lg bg-success px-4 font-semibold text-success-foreground hover:bg-success/90',
        className,
      )}
    >
      <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer">
        <MessageCircle data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}
