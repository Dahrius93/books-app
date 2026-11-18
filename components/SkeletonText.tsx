import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonText() {
  return (
    <div className="pt-4 flex w-full max-w-2xl flex-col gap-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}
