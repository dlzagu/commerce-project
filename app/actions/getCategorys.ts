import prisma from '@/app/libs/prismadb'

export interface ICategorysParams {
  id?: string
  name?: string
  image?: string
  description?: string
  product?: string[]
}

export default async function getCategorys() {
  try {
    const listings = await prisma.category.findMany()

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
