'use client'

import { OrderItem } from '@prisma/client'
import Container from '../../components/Container'
import { useRouter } from 'next/navigation'
import { SafeOrder } from '@/app/types'
import { getDateCompare } from '@/app/helpers/date'
import { useEffect, useMemo } from 'react'
import OrderItemCard from '@/app/components/order/OrderItemCard'
import OrderItemBilling from '@/app/components/order/OrderItemsBilling'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
interface OrderClientProps {
  orderItems: OrderItem[]
  order: SafeOrder | null
}

const OrderClient: React.FC<OrderClientProps> = ({ orderItems, order }) => {
  const router = useRouter()

  const totalPrice = useMemo(
    () => orderItems.reduce((acc, curr) => acc + curr.price, 0),
    [orderItems]
  )

  return (
    <Container>
      <div className="bg-gray-50">
        <div className="max-w-2xl mx-auto pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order #{order?.id.slice(0, 8)}
              </h1>
            </div>
            <p className="text-sm text-gray-600">
              Order placed {getDateCompare(new Date(order?.createdAt as any))}
            </p>
          </div>

          {/* Products */}
          <div className="mt-6">
            <div className="space-y-8">
              {orderItems?.map((item) => (
                <OrderItemCard orderItem={item} order={order} />
              ))}
            </div>
          </div>

          {/* Billing */}
          <OrderItemBilling totalPrice={totalPrice} order={order} />
        </div>
      </div>
    </Container>
  )
}
export default OrderClient
