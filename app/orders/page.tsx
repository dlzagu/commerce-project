import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import OrdersClient from './OrdersClient'
import getOders from '../actions/getOders'

const OrdersPage = async () => {
  const currentUser = await getCurrentUser()
  const orders = await getOders()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }
  return (
    <ClientOnly>
      <OrdersClient orderss={orders} />
    </ClientOnly>
  )
}

export default OrdersPage
