import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  orderId: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { orderId } = params

  const oderItems = await prisma.orderItem.findMany({
    where: { orderId: orderId },
  })
  if (!oderItems) {
    return null
  }

  return NextResponse.json(oderItems)
}
