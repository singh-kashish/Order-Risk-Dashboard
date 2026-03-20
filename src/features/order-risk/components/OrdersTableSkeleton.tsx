import { Skeleton } from '@/components/ui/skeleton'

export function OrdersTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filters Skeleton */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-62.5" />
        <Skeleton className="h-10 w-45" />
        <Skeleton className="h-10 w-45" />
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-md">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 6 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-4 p-4 border-b"
          >
            {Array.from({ length: 6 }).map((_, col) => (
              <Skeleton key={col} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}