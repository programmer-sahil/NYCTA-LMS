import type { ComponentProps } from 'react'

import { Container } from '@/components/shared/container'
import { cn } from '@/lib/utils'

interface HomeSectionProps extends ComponentProps<'section'> {
  containerClassName?: string
}

export function HomeSection({
  className,
  containerClassName,
  children,
  ...props
}: HomeSectionProps) {
  return (
    <section
      className={cn('reveal py-16 sm:py-20 lg:py-24', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
