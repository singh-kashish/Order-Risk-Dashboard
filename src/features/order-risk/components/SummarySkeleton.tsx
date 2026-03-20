import { Skeleton } from '@/components/ui/skeleton'

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-6 w-20" />
        </div>
      ))}
    </div>
  )
}