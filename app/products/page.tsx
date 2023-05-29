import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ProductsClient from './ProductsClient'
import getCategories from '../actions/getCategories'
import getProducts, { IProductsParams } from '../actions/getProucts'

interface IParams {
  searchParams: IProductsParams
}

const ProductsPage = async ({ searchParams }: IParams) => {
  const products = await getProducts(searchParams)
  const categories = await getCategories()

  if (!products) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ProductsClient categories={categories} products={products} />
    </ClientOnly>
  )
}

export default ProductsPage
