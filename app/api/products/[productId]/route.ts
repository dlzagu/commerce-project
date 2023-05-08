import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  productId: string
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { productId } = params
  const body = await request.json()

  const { image, name, sizes, description, quantity, categoryId, price } = body

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
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

  return NextResponse.json(updatedProduct)
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID')
  }

  const product = await prisma.product.deleteMany({
    where: {
      id: productId,
    },
  })

  return NextResponse.json(product)
}
