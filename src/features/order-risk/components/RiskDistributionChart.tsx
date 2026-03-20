import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import type { Order } from '../types/order'

const COLORS = ['#ef4444', '#f59e0b', '#22c55e']

export function RiskDistributionChart({ orders }: { orders: Order[] }) {
  const data = [
    {
      name: 'High Risk',
      value: orders.filter((o) => o.riskLevel === 'High Risk').length,
    },
    {
      name: 'Medium Risk',
      value: orders.filter((o) => o.riskLevel === 'Medium Risk').length,
    },
    {
      name: 'Safe',
      value: orders.filter((o) => o.riskLevel === 'Safe').length,
    },
  ]

  return (
    <div className="h-75">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}