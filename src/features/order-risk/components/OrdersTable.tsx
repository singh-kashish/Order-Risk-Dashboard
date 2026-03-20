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

import { useMemo, useState } from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { Order } from '../types/order'

import { OrderDetailsDrawer } from './OrderDetailsDrawer'
import { toast } from 'sonner'

type Props = {
  orders: Order[]
}

const columnHelper = createColumnHelper<Order>()

export function OrdersTable({ orders }: Props) {
  // ================= STATE =================
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [riskFilter, setRiskFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [open, setOpen] = useState(false)

  // ================= FILTER DATA =================
  const filteredData = useMemo(() => {
    return orders.filter((o) => {
      return (
        (!cityFilter || o.city === cityFilter) &&
        (!riskFilter || o.riskLevel === riskFilter) &&
        (!globalFilter ||
          o.customer.toLowerCase().includes(globalFilter.toLowerCase()) ||
          o.id.toLowerCase().includes(globalFilter.toLowerCase()))
      )
    })
  }, [orders, cityFilter, riskFilter, globalFilter])

  // ================= COLUMNS =================
  const columns = [
    columnHelper.accessor('id', {
      header: 'Order ID',
    }),

    columnHelper.accessor('customer', {
      header: 'Customer',
    }),

    columnHelper.accessor('phone', {
      header: 'Phone',
    }),

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

  // ================= TABLE =================
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

  // ================= UNIQUE CITIES =================
  const cities = [...new Set(orders.map((o) => o.city))]

  return (
    <div className="space-y-4">

      {/* ===== Filters ===== */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search orders..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        <Select onValueChange={setCityFilter}>
          <SelectTrigger className="w-[180px]">
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

        <Select onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High Risk">High Risk</SelectItem>
            <SelectItem value="Medium Risk">Medium Risk</SelectItem>
            <SelectItem value="Safe">Safe</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setCityFilter('')
            setRiskFilter('')
            setGlobalFilter('')
            toast.success('Filters reset')
          }}
        >
          Reset
        </Button>
      </div>

      {/* ===== TABLE (RESPONSIVE FIX) ===== */}
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => {
                    setSelectedOrder(row.original)
                    setOpen(true)
                  }}
                  className="border-t hover:bg-muted/50 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-6 text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
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

      {/* ===== DRAWER ===== */}
      <OrderDetailsDrawer
        order={selectedOrder}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}