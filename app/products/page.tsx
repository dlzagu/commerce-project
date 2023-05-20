import getCurrentUser from '@/app/actions/getCurrentUser'
import getProductById from '@/app/actions/getProductById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ProductsClient from './ProductsClient'
import getCategories from '../actions/getCategories'

interface IParams {
  productId?: string
}

const ProductPage = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params)
  const categories = await getCategories()
  const currentUser = await getCurrentUser()

  if (!product) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ProductsClient categories={categories} />
    </ClientOnly>
  )
}

export default ProductPage
