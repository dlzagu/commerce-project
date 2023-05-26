import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import CheckoutClient from './CheckoutClient'

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
      <CheckoutClient currentUser={currentUser} />
    </ClientOnly>
  )
}

export default CheckoutPage
