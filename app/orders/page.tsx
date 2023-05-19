import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import OrdersClient from './OrdersClient'
import getOrders from '../actions/getOrders'

const OrdersPage = async () => {
  const currentUser = await getCurrentUser()
  const orders = await getOrders()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }
  if (orders.length == 0) {
    return (
      <EmptyState
        title="Not order details"
        subtitle="Thank you for completing the payment."
      />
    )
  }
  return (
    <ClientOnly>
      <OrdersClient orders={orders} />
    </ClientOnly>
  )
}

export default OrdersPage
