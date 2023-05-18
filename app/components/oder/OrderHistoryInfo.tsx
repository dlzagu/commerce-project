import { OrderItem } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { getDateCompare } from '@/app/helpers/date'
import { SafeOrder } from '@/app/types'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface OrerHistoryInfoProps {
  order: SafeOrder
}

const OrerHistoryInfo = ({ order }: OrerHistoryInfoProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const totalPrice = useMemo(
    () => orderItems.reduce((acc, cur) => acc + cur.price, 0),
    [orderItems]
  )

  useEffect(() => {
    axios
      .get(`/api/order/${order.id}`)
      .then((res) => {
        setOrderItems(res.data)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }, [])

  return (
    <div key={order.id}>
      <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="sm:mt-1">
              {getDateCompare(
                new Date(order.updatedAt ? order.updatedAt : order.createdAt)
              )}
            </dd>
          </div>
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="sm:mt-1">{order.id}</dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">{totalPrice} won</dd>
          </div>
        </dl>
        <a
          href={order.id}
          className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
        >
          View Invoice
          <span className="sr-only">for order {order.id}</span>
        </a>
      </div>

      <table className="mt-4 w-full text-gray-500 sm:mt-6">
        <caption className="sr-only">Products</caption>
        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
          <tr>
            <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
              Product
            </th>
            <th
              scope="col"
              className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
            >
              Price
            </th>
            <th
              scope="col"
              className="hidden pr-8 py-3 font-normal sm:table-cell"
            >
              Status
            </th>
            <th scope="col" className="w-0 py-3 font-normal text-right">
              Info
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
          {orderItems?.map((item: OrderItem) => (
            <tr key={item.id}>
              <td className="py-6 pr-8">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.image}
                    className="w-16 h-16 object-center object-cover rounded mr-6"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="mt-1 sm:hidden">{item.price}</div>
                  </div>
                </div>
              </td>
              <td className="hidden py-6 pr-8 sm:table-cell">{item.price}</td>
              <td className="hidden py-6 pr-8 sm:table-cell">Processing</td>
              <td className="py-6 font-medium text-right whitespace-nowrap">
                <a href={item.id} className="text-indigo-600">
                  View
                  <span className="hidden lg:inline"> item</span>
                  <span className="sr-only">, {item.name}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrerHistoryInfo
