import ClientOnly from '@/app/components/ClientOnly'
import getCurrentUser from '@/app/actions/getCurrentUser'
import CartsClient from './CartsClient'

const CartPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
      <CartsClient currentUser={currentUser} />
    </ClientOnly>
  )
}

export default CartPage
