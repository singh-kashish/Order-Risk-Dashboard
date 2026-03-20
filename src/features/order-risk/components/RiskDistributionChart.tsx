import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import type { Order } from '../types/order'

export function RiskDistributionChart({ orders }: { orders: Order[] }) {
  const data = [
    {
      name: 'High Risk',
      value: orders.filter((o) => o.riskLevel === 'High Risk').length,
      fill: '#ef4444',
    },
    {
      name: 'Medium Risk',
      value: orders.filter((o) => o.riskLevel === 'Medium Risk').length,
      fill: '#f59e0b',
    },
    {
      name: 'Safe',
      value: orders.filter((o) => o.riskLevel === 'Safe').length,
      fill: '#22c55e',
    },
  ]

  return (
    <div className="h-75">
      <h5 className='font-bold text-2xl'>Risk Distribution Chart</h5>
      <ResponsiveContainer>
        
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}