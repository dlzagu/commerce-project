import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getOders() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
    })

    const safeOrders = orders.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
      updatedAt: favorite.updatedAt?.toISOString(),
    }))

    return safeOrders
  } catch (error: any) {
    throw new Error(error)
  }
}
