import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

import { useMemo, useState, useEffect } from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { Order } from '../types/order'

import { OrderDetailsDrawer } from './OrderDetailsDrawer'
import { EmptyState } from './EmptyState'
import { toast } from 'sonner'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useUpdateOrder } from '../hooks/useUpdateOrder'

type Props = {
  orders: Order[]
}

const columnHelper = createColumnHelper<Order>()

export function OrdersTable({ orders }: Props) {
  const navigate = useNavigate()
  const search = useSearch({ from: '/_authenticated/order-risk/' })

  const { mutate } = useUpdateOrder()

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // ✅ URL-based filters
  const [cityFilter, setCityFilter] = useState<string | undefined>(
    search.city
  )
  const [riskFilter, setRiskFilter] = useState<string | undefined>(
    search.risk
  )

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [open, setOpen] = useState(false)

  const [resetKey, setResetKey] = useState(0)

  const [tableData, setTableData] = useState<Order[]>(orders)

  useEffect(() => {
    setTableData(orders)
  }, [orders])

  // ✅ Sync filters → URL
  useEffect(() => {
  navigate({
    from: '/order-risk/', 
    search: {
      city: cityFilter || undefined,
      risk: riskFilter || undefined,
    },
    replace: true,
  })
}, [cityFilter, riskFilter, navigate])

  const filteredData = useMemo(() => {
    return tableData.filter((o) => {
      return (
        (!cityFilter || o.city === cityFilter) &&
        (!riskFilter || o.riskLevel === riskFilter) &&
        (!globalFilter ||
          o.customer.toLowerCase().includes(globalFilter.toLowerCase()) ||
          o.id.toLowerCase().includes(globalFilter.toLowerCase()))
      )
    })
  }, [tableData, cityFilter, riskFilter, globalFilter])

  const columns = [
    columnHelper.accessor('id', { header: 'Order ID' }),
    columnHelper.accessor('customer', { header: 'Customer' }),
    columnHelper.accessor('phone', { header: 'Phone' }),

    columnHelper.accessor('city', {
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          City <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),

    columnHelper.accessor('orderValue', {
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Value <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => `₹${getValue()}`,
    }),

    columnHelper.accessor('riskScore', {
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Risk <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => `${getValue()}%`,
    }),

    columnHelper.accessor('riskLevel', {
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue()
        const variant =
          value === 'High Risk'
            ? 'destructive'
            : value === 'Medium Risk'
            ? 'secondary'
            : 'default'

        return <Badge variant={variant}>{value}</Badge>
      },
    }),
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const cities = [...new Set(tableData.map((o) => o.city))]

  // EMPTY STATE (no data)
  if (!orders.length) {
    return (
      <EmptyState
        title="No orders found"
        description="There are no orders available."
      />
    )
  }

  // EMPTY STATE (after filters)
  if (filteredData.length === 0) {
    return (
      <EmptyState
        title="No matching results"
        description="Try adjusting your filters."
        action={() => {
          setCityFilter(undefined)
          setRiskFilter(undefined)
          setGlobalFilter('')
          setResetKey((prev) => prev + 1)
        }}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search orders..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        {/* City */}
        <Select
          key={`city-${resetKey}`}
          value={cityFilter}
          onValueChange={setCityFilter}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Risk */}
        <Select
          key={`risk-${resetKey}`}
          value={riskFilter}
          onValueChange={setRiskFilter}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High Risk">High Risk</SelectItem>
            <SelectItem value="Medium Risk">Medium Risk</SelectItem>
            <SelectItem value="Safe">Safe</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={() => {
            setCityFilter(undefined)
            setRiskFilter(undefined)
            setGlobalFilter('')
            setResetKey((prev) => prev + 1)
            toast.success('Filters reset')
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-225 w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left whitespace-nowrap">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelectedOrder(row.original)
                  setOpen(true)
                }}
                className={`border-t hover:bg-muted/50 cursor-pointer ${
                  selectedOrder?.id === row.original.id ? 'bg-muted' : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Drawer */}
      <OrderDetailsDrawer
        order={selectedOrder}
        open={open}
        onOpenChange={setOpen}
        onUpdateOrder={(updated) => {
          // ✅ optimistic update
          setTableData((prev) =>
            prev.map((o) => (o.id === updated.id ? updated : o))
          )

          mutate(updated)
        }}
      />
    </div>
  )
}