import React, { Fragment, useMemo, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { HiChevronUp } from 'react-icons/hi'
import { CartItem } from '@/app/hooks/useCartItem'
import CheckoutInput from '../inputs/CheckoutInput'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface CheckoutFormProps {
  onSubmit?: () => void
  disabled?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  disabled,
  register,
  errors,
}) => {
  return (
    <form
      onSubmit={onSubmit}
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
            disabled={disabled}
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
            disabled={disabled}
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
              disabled={disabled}
              id="cardNumber"
              label="Card Number (numbers only)"
              type="text"
              message="TEST CARD NUMBER : 4242424242424242"
              register={register}
              validation={{
                minLength: {
                  value: 16,
                  message: 'Card number must be 16 digits',
                },
                maxLength: {
                  value: 16,
                  message: 'Card number must be 16 digits',
                },
              }}
              errors={errors}
              required
              grid="col-span-3 sm:col-span-4"
              htmlFor="card-number"
            />

            <CheckoutInput
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
              id="address"
              label="상세주소"
              type="text"
              register={register}
              errors={errors}
              required
              grid="sm:col-span-3"
              htmlFor="street-adress"
              autoComplete="street-adress"
            />

            <CheckoutInput
              disabled={disabled}
              id="city"
              label="시/군/구"
              type="text"
              register={register}
              errors={errors}
              required
              htmlFor="city"
              autoComplete="address-level2"
            />

            <CheckoutInput
              disabled={disabled}
              id="state"
              label="시/도"
              type="text"
              register={register}
              errors={errors}
              required
              htmlFor="region"
              autoComplete="address-level1"
            />

            <CheckoutInput
              disabled={disabled}
              id="postalCode"
              label="우편번호"
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
  )
}

export default CheckoutForm
