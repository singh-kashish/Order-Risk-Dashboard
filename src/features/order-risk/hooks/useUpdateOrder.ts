import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { Order } from '../types/order'

const ORDERS_URL = '/api/orders'

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updated: Order) => {
      const res = await axios.put(`${ORDERS_URL}/${updated.id}`, updated)
      return res.data
    },

    // ✅ Optimistic update
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })

      const previous = queryClient.getQueryData<Order[]>(['orders'])

      queryClient.setQueryData<Order[]>(['orders'], (old = []) =>
        old.map((o) => (o.id === updated.id ? updated : o))
      )

      return { previous }
    },

    onError: (_err, _updated, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['orders'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}