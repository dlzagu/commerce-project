import { getDateCompare } from '@/app/helpers/date'
import { SafeOrder } from '@/app/types'
import { OrderItem } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface OrderItemCardProps {
  orderItem: OrderItem
  order: SafeOrder | null
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const OrderItemCard = ({ orderItem, order }: OrderItemCardProps) => {
  const router = useRouter()
  return (
    <div
      key={orderItem.id}
      className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
    >
      <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
        <div className="sm:flex lg:col-span-7">
          <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
            <Image
              width={200}
              height={200}
              priority
              src={orderItem.image}
              alt={orderItem.image}
              className="w-full h-full object-center object-cover sm:w-full sm:h-full"
            />
          </div>

          <div className="mt-6 sm:mt-0 sm:ml-6">
            <h3
              onClick={() => router.push(`/products/${orderItem.productId}`)}
              className="text-base font-medium cursor-pointer text-gray-900 hover:text-gray-500"
            >
              {orderItem.name}
            </h3>

            <p className="mt-3 text-sm text-gray-500">silver</p>
            <p className="mt-2 text-sm font-medium text-gray-900">
              {orderItem.price} won
            </p>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:col-span-5">
          <dl className="grid grid-cols-2 gap-x-6 text-sm">
            <div>
              <dt className="font-medium text-gray-900">Delivery address</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">{order?.state}</span>
                <span className="block">{order?.city}</span>
                <span className="block">
                  {order?.postalCode + ' ' + order?.address}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Shipping updates</dt>
              <dd className="mt-3 text-gray-500 space-y-3">
                <p>{order?.name}</p>
                <p>{order?.phoneNumber}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
        <p className="text-sm font-medium text-gray-900">
          {getDateCompare(new Date(order?.createdAt as any))}
        </p>
        <div className="mt-6" aria-hidden="true">
          <div className="bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{
                width: `calc((1 * 2 + 1) / 8 * 100%)`,
              }}
            />
          </div>
          <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
            <div className="text-indigo-600">Order placed</div>
            <div className={classNames('text-indigo-600', 'text-center')}>
              Processing
            </div>
            <div className={classNames('text-center')}>Shipped</div>
            <div className={classNames('text-right')}>Delivered</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard
