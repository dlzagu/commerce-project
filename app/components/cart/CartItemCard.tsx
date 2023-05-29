import { CartItem } from '@/app/hooks/useCartItem'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HiCheck, HiX } from 'react-icons/hi'

interface CartItemCardProps {
  cartItem: CartItem
  idx: number
  onClickDelete: (idx: number) => void
}

const CartItemCard = ({ cartItem, onClickDelete, idx }: CartItemCardProps) => {
  const router = useRouter()
  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div
          className="w-24 h-24 sm:w-48 sm:h-48 cursor-pointer"
          onClick={() => router.push(`/products/${cartItem.id}`)}
        >
          <Image
            src={cartItem.image}
            alt={cartItem.image}
            width={240}
            height={240}
            className="rounded-md object-center object-cover"
            sizes="(min-width: 640px) 192px, 96px"
            priority
          />
        </div>
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">{cartItem.name}</h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">silver</p>
              {cartItem.size ? (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                  {cartItem.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {cartItem.price} won
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={() => onClickDelete(idx)}
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
              >
                <HiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
          <HiCheck
            className="flex-shrink-0 h-5 w-5 text-green-500"
            aria-hidden="true"
          />
          <span>In stock</span>
        </p>
      </div>
    </li>
  )
}

export default CartItemCard
