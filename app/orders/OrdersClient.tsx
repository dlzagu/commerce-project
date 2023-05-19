'use client'

import Container from '../components/Container'
import { SafeOrder, SafeUser } from '../types'
import OrerHistoryInfo from '../components/order/OrderHistoryInfo'

/* This example requires Tailwind CSS v2.0+ */

interface OrdersClientProps {
  orders: SafeOrder[]
  currentUser?: SafeUser | null
}
const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  return (
    <Container>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              {orders.map((order) => (
                <OrerHistoryInfo order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default OrdersClient
