import prisma from '@/app/libs/prismadb'

interface IParams {
  orderId?: string
}

export default async function getOrderItemsById(params: IParams) {
  try {
    const { orderId } = params
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: orderId },
    })
    if (!orderItems) {
      return []
    }

    return orderItems
  } catch (error: any) {
    throw new Error(error)
  }
}
