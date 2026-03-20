// utils/transform.ts

import { RawOrder, Order } from '../types/order'
import { calculateRiskScore, getRiskLevel } from './risk'

export const transformOrders = (data: RawOrder[]): Order[] => {
  return data.map((item) => {
    const riskScore = calculateRiskScore(
      item.cod_orders,
      item.total_orders
    )

    return {
      id: item.order_id,
      customer: item.customer,
      phone: item.phone,
      city: item.city,
      orderValue: item.order_value,
      items: item.items,
      paymentMethod: item.payment_method,
      orderStatus: item.order_status,
      createdAt: item.created_at,

      totalOrders: item.total_orders,
      codOrders: item.cod_orders,
      prepaidOrders: item.prepaid_orders,

      riskScore: Number(riskScore.toFixed(1)),
      riskLevel: getRiskLevel(riskScore),
    }
  })
}