import getCurrentUser from '@/app/actions/getCurrentUser'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ProductsSearchClient from './ProductsSearchClient'
import getCategories from '../actions/getCategories'
import getProducts, { IProductsParams } from '../actions/getProucts'

interface IParams {
  searchParams: IProductsParams
}

const ProductsSearchPage = async ({ searchParams }: IParams) => {
  const products = await getProducts(searchParams)
  const categories = await getCategories()

  return (
    <ClientOnly>
      <ProductsSearchClient categories={categories} products={products} />
    </ClientOnly>
  )
}

export default ProductsSearchPage
