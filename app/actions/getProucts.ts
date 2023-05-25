import prisma from '@/app/libs/prismadb'
import { PRODUCTS_PER_PAGE } from '../constants'

export interface IProductsParams {
  category?: string
  sizes?: string
  sort?: string
  searchKeyword?: string
  page?: string
}

export default async function getProducts(params: IProductsParams) {
  let { category, sizes, sort, searchKeyword, page } = params
  let currentPage = Number(page) || 1

  let skip = currentPage > 1 ? (currentPage - 1) * PRODUCTS_PER_PAGE : undefined

  let where: any = {}
  const categoryArr = category?.split(',')
  const sizesArr = sizes?.split(',')
  if (searchKeyword) {
    where = {
      ...where,
      name: {
        contains: searchKeyword,
        mode: 'insensitive',
      },
    }
  }
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
      ...(skip && { skip }),
      take: PRODUCTS_PER_PAGE,
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
