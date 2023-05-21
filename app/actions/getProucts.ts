import prisma from '@/app/libs/prismadb'
import qs from 'query-string'

export interface IProductsParams {
  category?: string
  sizes?: string
  sort?: string
}

export default async function getProducts(params: IProductsParams) {
  let { category, sizes, sort } = params

  let where: any = {}
  const categoryArr = category?.split(',')
  const sizesArr = sizes?.split(',')

  if (category) {
    where.category = {
      name: {
        in: categoryArr,
      },
    }
  }
  if (sizes) {
    where = {
      ...where,
      sizes: {
        hasSome: sizesArr,
      },
    }
  }

  let orderBy = {}
  switch (sort) {
    case 'priceHigh':
      orderBy = {
        price: 'desc',
      }
      break
    case 'priceLow':
      orderBy = {
        price: 'asc',
      }
      break
    case 'new':
      orderBy = {
        createdAt: 'desc',
      }
      break
    default:
      orderBy = {
        createdAt: 'desc',
      }
      break
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
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
