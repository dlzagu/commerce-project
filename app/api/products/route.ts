import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import { parse } from 'path'

export async function POST(request: Request) {
  const body = await request.json()
  const { image, name, sizes, description, quantity, categoryId, price } = body

  const product = await prisma.product.create({
    data: {
      name,
      image,
      description,
      sizes,
      quantity: parseInt(quantity),
      categoryId,
      price: parseInt(price),
    },
  })

  return NextResponse.json(product)
}
