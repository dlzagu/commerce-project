import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {
  const body = await request.json()
  const { images, name, sizes, description, quantity, categoryId, price } = body

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
