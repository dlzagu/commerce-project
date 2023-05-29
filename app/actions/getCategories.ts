import prisma from '@/app/libs/prismadb'

export interface ICategorysParams {
  id?: string
  name?: string
  image?: string
  description?: string
  product?: string[]
}

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany()

    return categories
  } catch (error: any) {
    throw new Error(error)
  }
}
