'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { HiChevronUp } from 'react-icons/hi'
import { CartItem } from '@/app/hooks/useCartItem'
import Image from 'next/image'
import { FREE_FEE } from '@/app/constants'

interface OrderSummaryProps {
  cartItems: CartItem[]
  totalPrice: number
}

const OrderSummary = ({ cartItems, totalPrice }: OrderSummaryProps) => {
  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
    >
      <div className="max-w-lg mx-auto lg:max-w-none">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <ul
          role="list"
          className="text-sm font-medium text-gray-900 divide-y divide-gray-200"
        >
          {cartItems.map((product) => (
            <li key={product.id} className="flex items-start py-6 space-x-4">
              <Image
                width={80}
                height={80}
                priority
                src={product.image}
                alt={product.image}
                className="flex-none rounded-md object-center object-cover"
              />
              <div className="flex-auto space-y-1">
                <h3>{product.name}</h3>
                <p className="text-gray-500">silver</p>
                <p className="text-gray-500">{product.size}</p>
              </div>
              <p className="flex-none text-base font-medium">
                {product.price} won
              </p>
            </li>
          ))}
        </ul>

        <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>{totalPrice} won</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd>{totalPrice >= FREE_FEE ? 0 : 3000} won</dd>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">
              {totalPrice >= FREE_FEE ? totalPrice : totalPrice + 3000} won
            </dd>
          </div>
        </dl>

        <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
          <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <Popover.Button className="w-full flex items-center py-6 font-medium">
                <span className="text-base mr-auto">Total</span>
                <span className="text-base mr-2">
                  {totalPrice >= FREE_FEE ? totalPrice : totalPrice + 3000} won
                </span>
                <HiChevronUp
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                  <dl className="max-w-lg mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd>{totalPrice} won</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd>{totalPrice >= FREE_FEE ? 0 : 3000} won</dd>
                    </div>
                  </dl>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </Popover>
      </div>
    </section>
  )
}

export default OrderSummary
