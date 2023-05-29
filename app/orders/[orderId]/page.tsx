import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import OrderClient from './OrderClient'
import getOrderById from '@/app/actions/getOrderById'

interface IParams {
  orderId?: string
}
const OrderPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  const order = await getOrderById(params)
  if (!order) {
    return <EmptyState title="Unauthorized" subtitle="Not Order" />
  }

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }
  return (
    <ClientOnly>
      <OrderClient order={order} orderItems={order.orderItems} />
    </ClientOnly>
  )
}

export default OrderPage
