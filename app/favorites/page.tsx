import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getFavoriteProducts from '@/app/actions/getFavoriteProducts'
import FavoritesClient from './FavoritesClient'

const ListingPage = async () => {
  const products = await getFavoriteProducts()
  const currentUser = await getCurrentUser()

  if (products.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite products."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient products={products} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage
