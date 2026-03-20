import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ShoppingCart, AlertTriangle, Percent } from 'lucide-react'
import type { Order } from '../types/order'

type Props = {
  orders: Order[]
}

export function SummaryCards({ orders }: Props) {
  const totalOrders = orders.length

  const highRiskOrders = orders.filter(
    (o) => o.riskLevel === 'High Risk'
  ).length

  const codOrders = orders.filter(
    (o) => o.paymentMethod === 'COD'
  ).length

  const codPercentage = totalOrders
    ? ((codOrders / totalOrders) * 100).toFixed(1)
    : '0'

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-sm font-medium'>
            Total Orders
          </CardTitle>
          <ShoppingCart className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalOrders}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-sm font-medium'>
            High Risk Orders
          </CardTitle>
          <AlertTriangle className='h-4 w-4 text-destructive' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-destructive'>
            {highRiskOrders}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-sm font-medium'>
            COD Percentage
          </CardTitle>
          <Percent className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {codPercentage}%
          </div>
        </CardContent>
      </Card>
    </div>
  )
}