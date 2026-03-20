// src/routes/_authenticated/order-risk.tsx

import { createFileRoute } from '@tanstack/react-router'
import { OrderRiskPage } from '@/features/order-risk'

export const Route = createFileRoute('/_authenticated/order-risk/')({
  component: OrderRiskPage,
})