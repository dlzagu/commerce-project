'use client'

import { OrderItem } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface OrderHistoryItemInfoProps {
  orderItem: OrderItem
}

const OrderHistoryItemInfo = ({ orderItem }: OrderHistoryItemInfoProps) => {
  const router = useRouter()
  return (
    <tr key={orderItem.id}>
      <td className="py-6 pr-8">
        <div className="flex items-center">
          <Image
            width={140}
            height={140}
            priority
            src={orderItem.image}
            alt={orderItem.image}
            className="object-center object-cover rounded mr-6"
          />
          <div>
            <div className="font-medium text-gray-900">{orderItem.name}</div>
            <div className="mt-1 sm:hidden">{orderItem.price} won</div>
          </div>
        </div>
      </td>
      <td className="hidden py-6 pr-8 sm:table-cell">{orderItem.price}</td>
      <td className="hidden py-6 pr-8 sm:table-cell">Processing</td>
      <td className="py-6 font-medium text-right whitespace-nowrap">
        <div
          onClick={() => router.push(`/products/${orderItem.productId}`)}
          className="text-indigo-600 cursor-pointer"
        >
          View
          <span className="hidden lg:inline"> orderItem</span>
        </div>
      </td>
    </tr>
  )
}

export default OrderHistoryItemInfo
