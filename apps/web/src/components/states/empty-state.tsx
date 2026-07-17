import { FolderOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  action,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed bg-card/50 shadow-none">
      <CardContent className="flex flex-col items-center px-5 py-10 text-center">
        <span className="grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-base font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {action ? <div className="mt-5">{action}</div> : null}
      </CardContent>
    </Card>
  )
}
