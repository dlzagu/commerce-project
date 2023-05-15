import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import getCurrentUser from '@/app/actions/getCurrentUser'

import CartsClient from './CartsClient'
import useCartItem from '../hooks/useCartItem'

const ListingPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
      <CartsClient currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage
