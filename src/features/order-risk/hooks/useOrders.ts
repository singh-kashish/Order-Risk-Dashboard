import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { RawOrder, Order } from '../types/order'
import { transformOrders } from '../utils/transform'

const ORDERS_URL =
  'https://cdn.shopify.com/s/files/1/0806/4876/5758/files/user_mock_data.json'

export const useOrders = () => {
  return useQuery<RawOrder[], Error, Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axios.get<RawOrder[]>(ORDERS_URL)
      return res.data
    },
    select: (data) => transformOrders(data),
  })
}