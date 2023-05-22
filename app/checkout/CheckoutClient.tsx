'use client'
import { Fragment, useMemo, useState } from 'react'
import useCartItem from '../hooks/useCartItem'
import { SafeUser } from '@/app/types'
import useLoginModal from '../hooks/useLoginModal'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TEST_CARD_NUMNER } from '../constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import OrderSummary from '../components/order/OrderSummary'
import CheckoutForm from '../components/order/CheckoutForm'

interface CheckoutClientProps {
  currentUser?: SafeUser | null
}

const CheckoutClient: React.FC<CheckoutClientProps> = ({ currentUser }) => {
  const { cartItems } = useCartItem()
  const [isLoading, setIsLoading] = useState(false)
  const { removeAllItem } = useCartItem()
  const loginModal = useLoginModal()
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
    if (!currentUser) return loginModal.onOpen()

    setIsLoading(true)
    data.items = cartItems

    axios
      .post('/api/order', data)
      .then((res) => {
        let { id } = res.data
        toast.success('주문 완료')
        router.push(`/orders/${id}`)
        removeAllItem()
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
          title="결제할 상품이 없습니다."
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
            <OrderSummary cartItems={cartItems} totalPrice={totalPrice} />
            <CheckoutForm
              onSubmit={handleSubmit(onSubmit)}
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      )}
    </Container>
  )
}
export default CheckoutClient
