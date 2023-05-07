import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {
  const body = await request.json()
  const { image, name, description } = body

  const category = await prisma.category.create({
    data: {
      name,
      image,
      description,
    },
  })

  return NextResponse.json(category)
}
