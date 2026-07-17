import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSkeletonProps {
  cards?: number
}

export function LoadingSkeleton({ cards = 3 }: LoadingSkeletonProps) {
  return (
    <div
      className="grid gap-4 md:grid-cols-3"
      aria-label="Content loading"
      aria-busy="true"
    >
      {Array.from({ length: cards }, (_, index) => (
        <Card
          key={`loading-card-${String(index)}`}
          className="bg-card/70 shadow-none"
        >
          <CardHeader>
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="mt-3 h-5 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
      <span className="sr-only">Loading content</span>
    </div>
  )
}
