'use client'

import useCartItem from '@/app/hooks/useCartItem'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const router = useRouter()
  const { cartItems } = useCartItem()
  return (
    <div className="ml-4 flow-root lg:ml-6 cursor-pointer">
      <div
        onClick={() => router.push('/cart')}
        className="group -m-2 flex items-center p-2"
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {cartItems.length}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </div>
    </div>
  )
}

export default Cart
