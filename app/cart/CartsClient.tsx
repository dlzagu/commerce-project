'use client'
import { SafeUser } from '@/app/types'

import Container from '@/app/components/Container'
import { HiCheck, HiQuestionMarkCircle, HiX } from 'react-icons/hi'
import useCartItem from '../hooks/useCartItem'
import EmptyState from '../components/EmptyState'
import { toast } from 'react-hot-toast'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CartsClientProps {
  currentUser?: SafeUser | null
}

const CartsClient: React.FC<CartsClientProps> = ({ currentUser }) => {
  const router = useRouter()
  const { cartItems, removeItem } = useCartItem()
  const [renderItems, setRenderItems] = useState(cartItems)

  const totalPrice = useMemo(
    () => renderItems.reduce((acc, curr) => acc + curr.price, 0),
    [cartItems]
  )

  const handleRemoveToCart = (idx: number) => {
    removeItem(idx)
    toast.success('삭제 완료')
  }

  useEffect(() => {
    setRenderItems(cartItems)
  }, [cartItems])

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
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {renderItems.map((cart, Idx) => (
                    <li key={Idx} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div
                          className="w-24 h-24 sm:w-48 sm:h-48"
                          onClick={() => router.push(`/products/${cart.id}`)}
                        >
                          <Image
                            src={cart.image}
                            alt={cart.image}
                            width={240}
                            height={240}
                            className="rounded-md object-center object-cover"
                            sizes="(min-width: 640px) 192px, 96px"
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">{cart.name}</h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">silver</p>
                              {cart.size ? (
                                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                                  {cart.size}
                                </p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {cart.price} won
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                onClick={() => handleRemoveToCart(Idx)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
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
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {totalPrice} won
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how shipping is calculated
                        </span>
                        <HiQuestionMarkCircle
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      3000 won
                    </dd>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {totalPrice + 3000} won
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      )}
    </Container>
  )
}

export default CartsClient
