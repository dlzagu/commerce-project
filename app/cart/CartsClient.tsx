'use client'
import { SafeUser } from '@/app/types'

import Container from '@/app/components/Container'
import useCartItem from '../hooks/useCartItem'
import EmptyState from '../components/EmptyState'
import { toast } from 'react-hot-toast'
import { useMemo } from 'react'
import CartOrderSummary from '../components/cart/CartOderSummary'
import CartItemCard from '../components/cart/CartItemCard'

interface CartsClientProps {
  currentUser?: SafeUser | null
}

const CartsClient: React.FC<CartsClientProps> = ({ currentUser }) => {
  const { cartItems, removeItem } = useCartItem()

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.price, 0),
    [cartItems]
  )

  const handleRemoveToCart = (idx: number) => {
    removeItem(idx)
    toast.success('Deleted')
  }

  return (
    <Container>
      {cartItems.length == 0 ? (
        <EmptyState title="No cart" subtitle="장바구니가 비었습니다." />
      ) : (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {cartItems.map((cart, idx) => (
                    <CartItemCard
                      key={idx}
                      cartItem={cart}
                      idx={idx}
                      onClickDelete={handleRemoveToCart}
                    />
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <CartOrderSummary totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default CartsClient
