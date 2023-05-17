'use client'
import { Fragment, useMemo, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { HiChevronUp } from 'react-icons/hi'
import useCartItem from '../hooks/useCartItem'
import { SafeUser } from '@/app/types'
import useLoginModal from '../hooks/useLoginModal'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import CheckoutInput from '../components/inputs/CheckoutInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TEST_CARD_NUMNER } from '../constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CheckoutClientProps {
  currentUser?: SafeUser | null
}

const CheckoutClient: React.FC<CheckoutClientProps> = ({ currentUser }) => {
  const { cartItems } = useCartItem()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.price, 0),
    [cartItems]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      cardNumber: '',
      exporationDate: '',
      cvc: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
    },
  })
  const cardNumber = watch('cardNumber')
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (cardNumber !== TEST_CARD_NUMNER) return toast.error('wrong card number')

    setIsLoading(true)
    data.items = cartItems

    console.log(data)

    axios
      .post('/api/order', data)
      .then(() => {
        toast.success('주문 완료')
        router.refresh()
        reset()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Container>
      {cartItems.length == 0 ? (
        <EmptyState
          title="상품이 없습니다."
          subtitle="상품을 장바구니에 담아주세요"
        />
      ) : (
        <div className="bg-white">
          {/* Background color split screen for large screens */}
          <div
            className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white"
            aria-hidden="true"
          />
          <div
            className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-gray-50"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48">
            <h1 className="sr-only">Order information</h1>

            <section
              aria-labelledby="summary-heading"
              className="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
            >
              <div className="max-w-lg mx-auto lg:max-w-none">
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 divide-y divide-gray-200"
                >
                  {cartItems.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-start py-6 space-x-4"
                    >
                      <img
                        src={product.image}
                        alt={product.image}
                        className="flex-none w-20 h-20 rounded-md object-center object-cover"
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
                    <dd>{totalPrice + 3000} won</dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">{totalPrice + 3000} won</dd>
                  </div>
                </dl>

                <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                  <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                    <div className="max-w-lg mx-auto">
                      <Popover.Button className="w-full flex items-center py-6 font-medium">
                        <span className="text-base mr-auto">Total</span>
                        <span className="text-base mr-2">
                          {totalPrice + 3000} won
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
                              <dd>3000 won</dd>
                            </div>
                          </dl>
                        </Popover.Panel>
                      </Transition.Child>
                    </div>
                  </Transition.Root>
                </Popover>
              </div>
            </section>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
            >
              <div className="max-w-lg mx-auto lg:max-w-none">
                <section aria-labelledby="contact-info-heading">
                  <h2
                    id="contact-info-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Contact information
                  </h2>
                  <CheckoutInput
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    errors={errors}
                    required
                    grid="mt-6"
                    htmlFor="name"
                    autoComplete="name"
                  />

                  <CheckoutInput
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    register={register}
                    errors={errors}
                    required
                    grid="mt-6"
                    htmlFor="phone-number"
                    autoComplete="phone"
                  />
                </section>

                <section aria-labelledby="payment-heading" className="mt-10">
                  <h2
                    id="payment-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Payment details
                  </h2>

                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                    <CheckoutInput
                      id="cardNumber"
                      label="Card Number (numbers only)"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      grid="col-span-3 sm:col-span-4"
                      htmlFor="card-number"
                    />

                    <CheckoutInput
                      id="exporationDate"
                      label="Expiration date (MM/YY)"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      grid="col-span-2 sm:col-span-3"
                      htmlFor="expiration-date"
                      autoComplete="cc-ecp"
                    />

                    <CheckoutInput
                      id="cvc"
                      label="CVC"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      htmlFor="cvc"
                      autoComplete="csc"
                    />
                  </div>
                </section>

                <section aria-labelledby="shipping-heading" className="mt-10">
                  <h2
                    id="shipping-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Shipping address
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <CheckoutInput
                      id="address"
                      label="Address"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      grid="sm:col-span-3"
                      htmlFor="street-adress"
                      autoComplete="street-adress"
                    />

                    <CheckoutInput
                      id="city"
                      label="City"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      htmlFor="city"
                      autoComplete="address-level2"
                    />

                    <CheckoutInput
                      id="state"
                      label="State / Province"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      htmlFor="region"
                      autoComplete="address-level1"
                    />

                    <CheckoutInput
                      id="postalCode"
                      label="Postal code"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                      htmlFor="postal-code"
                      autoComplete="postal-code"
                    />
                  </div>
                </section>

                <div className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
                  >
                    Pay Now
                  </button>
                  <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                    Please complete the payment
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  )
}
export default CheckoutClient
