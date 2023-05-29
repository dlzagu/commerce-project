import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  categoryId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { categoryId } = params

  if (!categoryId || typeof categoryId !== 'string') {
    throw new Error('Invalid ID')
  }

  const category = await prisma.category.deleteMany({
    where: {
      id: categoryId,
    },
  })

  return NextResponse.json(category)
}
