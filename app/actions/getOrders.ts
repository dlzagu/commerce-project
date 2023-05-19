import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getOrders() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeOrders = orders.map((oder) => ({
      ...oder,
      createdAt: oder.createdAt.toString(),
      updatedAt: oder.updatedAt?.toISOString(),
    }))

    return safeOrders
  } catch (error: any) {
    throw new Error(error)
  }
}
