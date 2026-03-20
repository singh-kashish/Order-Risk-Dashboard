// src/features/order-risk/index.tsx

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { useOrders } from './hooks/useOrders'
import { SummaryCards } from './components/SummaryCards'
import { OrdersTable } from './components/OrdersTable'
import { RiskDistributionChart } from './components/RiskDistributionChart'
import { SummarySkeleton } from './components/SummarySkeleton'
import { OrdersTableSkeleton } from './components/OrdersTableSkeleton'

export function OrderRiskPage() {
  const { data: orders = [], isLoading } = useOrders()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SummarySkeleton />
        <OrdersTableSkeleton />
      </div>
    )
  }

  return (
    <>
      <Header>
        <TopNav links={[]} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-6'>
          <div>
            <h1 className='text-2xl font-bold'>
              Order Risk Dashboard
            </h1>
            <p className='text-muted-foreground'>
              Monitor risky orders and take actions
            </p>
          </div>

            <SummaryCards orders={orders || []} />
            <OrdersTable orders={orders || []} />
            <RiskDistributionChart orders={orders} />
        </div>
      </Main>
    </>
  )
}