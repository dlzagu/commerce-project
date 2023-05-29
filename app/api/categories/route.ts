import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const body = await request.json()
  const { image, name, description } = body
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  //중복검사
  const existingCategory = await prisma.category.findUnique({
    where: {
      name: name,
    },
  })

  if (existingCategory) {
    return NextResponse.error()
  }

  const category = await prisma.category.create({
    data: {
      name,
      image,
      description,
    },
  })

  return NextResponse.json(category)
}
