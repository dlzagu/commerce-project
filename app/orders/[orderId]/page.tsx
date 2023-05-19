import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import OrderClient from './OrderClient'
import getOrderItemsById from '@/app/actions/getOrderItemsById'
import getOrderById from '@/app/actions/getOrderById'

interface IParams {
  orderId?: string
}
const OrderPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  const orderItems = await getOrderItemsById(params)
  const order = await getOrderById(params)

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }
  return (
    <ClientOnly>
      <OrderClient orderItems={orderItems} order={order} />
    </ClientOnly>
  )
}

export default OrderPage
