import { Button } from '@/components/ui/button'

type Props = {
  title: string
  description?: string
  action?: () => void
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-lg font-medium">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      )}

      {action && (
        <Button variant="outline" className="mt-4" onClick={action}>
          Reset Filters
        </Button>
      )}
    </div>
  )
}