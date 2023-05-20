import prisma from '@/app/libs/prismadb'

export default async function getTrendingProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 4, // 최대 4개까지 상품을 가져오도록 설정
    })

    const safeProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }))

    return safeProducts
  } catch (error: any) {
    throw new Error(error)
  }
}
