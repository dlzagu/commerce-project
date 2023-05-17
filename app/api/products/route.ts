import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const body = await request.json()
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
  let { images, name, sizes, description, quantity, categoryId, price } = body

  const product = await prisma.product.create({
    data: {
      name,
      images,
      description,
      sizes,
      quantity: parseInt(quantity),
      categoryId,
      price: parseInt(price),
    },
  })

  return NextResponse.json(product)
}
