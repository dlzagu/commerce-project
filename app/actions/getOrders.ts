import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getOrders() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    // Order와 OrderItem을 함께 가져와라
    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItems: true,
      },
    })

    const safeOrders = orders.map((order) => ({
      ...order,
      createdAt: order.createdAt.toString(),
      updatedAt: order.updatedAt?.toISOString(),
    }))

    return safeOrders
  } catch (error: any) {
    throw new Error(error)
  }
}
