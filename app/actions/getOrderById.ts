import prisma from '@/app/libs/prismadb'

interface IParams {
  orderId?: string
}

export default async function getOrderById(params: IParams) {
  try {
    const { orderId } = params
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    })

    if (!order) {
      return null
    }

    const safeOrder = {
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }

    return safeOrder
  } catch (error: any) {
    throw new Error(error)
  }
}
