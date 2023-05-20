import prisma from '@/app/libs/prismadb'

interface IParams {
  productId?: string
}

export default async function getProductsById(params: IParams) {
  try {
    const { productId } = params
    const product = await prisma.product.findFirst({
      where: { id: productId },
    })
    if (!product) {
      return null
    }

    const safeProduct = {
      ...product,
      createdAt: product?.createdAt.toISOString(),
      updatedAt: product?.updatedAt?.toISOString(),
    }

    return safeProduct
  } catch (error: any) {
    throw new Error(error)
  }
}
