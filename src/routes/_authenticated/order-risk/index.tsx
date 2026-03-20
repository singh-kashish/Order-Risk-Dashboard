// src/routes/_authenticated/order-risk.tsx

import { createFileRoute } from '@tanstack/react-router'
import { OrderRiskPage } from '@/features/order-risk'

type OrderSearch = {
  city?: string
  risk?: string
}

export const Route = createFileRoute('/_authenticated/order-risk/')({
  component: OrderRiskPage,
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    return {
      city: typeof search.city === 'string' ? search.city : undefined,
      risk: typeof search.risk === 'string' ? search.risk : undefined,
    }
  },
})