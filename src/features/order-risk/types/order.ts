export type RawOrder = {
  order_id: string
  customer: string
  phone: string
  city: string
  order_value: number
  total_orders: number
  cod_orders: number
  prepaid_orders: number
  payment_method: 'COD' | 'Prepaid'
  order_status: string
  items: number
  created_at: string
}

export type Order = {
  id: string
  customer: string
  phone: string
  city: string
  orderValue: number
  items: number
  paymentMethod: string
  orderStatus: string
  createdAt: string

  totalOrders: number
  codOrders: number
  prepaidOrders: number

  riskScore: number
  riskLevel: 'High Risk' | 'Medium Risk' | 'Safe'
}