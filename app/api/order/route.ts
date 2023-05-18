import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const body = await request.json()
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
  let { name, phoneNumber, address, city, state, postalCode, items } = body

  const product = await prisma.order.create({
    data: {
      name,
      phoneNumber,
      address,
      city,
      state,
      postalCode,
      userId: currentUser.id,
      orderItems: {
        createMany: {
          data: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            size: item.size,
            price: item.price,
            image: item.image,
          })),
        },
      },
    },
  })

  return NextResponse.json(product)
}
