import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import CheckoutClient from './CheckoutClient'

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }
  return (
    <ClientOnly>
      <CheckoutClient currentUser={currentUser} />
    </ClientOnly>
  )
}

export default CheckoutPage
