import prisma from '@/app/libs/prismadb'

export default async function getProductsById(productId: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      orderBy: {
        createdAt: 'desc',
      },
    })

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
