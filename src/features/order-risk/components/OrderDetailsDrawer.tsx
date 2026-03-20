import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Order } from '../types/order'

type Props = {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailsDrawer({ order, open, onOpenChange }: Props) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Order {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          
          {/* Customer Info */}
          <div>
            <p className="font-medium">{order.customer}</p>
            <p className="text-sm text-muted-foreground">
              {order.phone}
            </p>
            <p className="text-sm">{order.city}</p>
          </div>

          {/* Order Info */}
          <div className="space-y-1">
            <p>Order Value: ₹{order.orderValue}</p>
            <p>Total Orders: {order.totalOrders}</p>
            <p>COD Orders: {order.codOrders}</p>
            <p>Prepaid Orders: {order.prepaidOrders}</p>
          </div>

          {/* Risk */}
          <div>
            <p className="font-medium">Risk Score</p>
            <p>{order.riskScore}%</p>
            <Badge>{order.riskLevel}</Badge>
          </div>

          {/* Explanation */}
          <div className="text-sm text-muted-foreground">
            Risk is calculated based on COD usage:
            {` ${order.codOrders}/${order.totalOrders} orders were COD.`}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline">Send OTP</Button>
            <Button variant="secondary">Force Prepaid</Button>
            <Button variant="default">Mark Safe</Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}