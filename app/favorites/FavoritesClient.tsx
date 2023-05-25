'use client'

import { SafeProduct, SafeUser } from '@/app/types'
import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import ProductCard from '../components/products/ProductCard'

interface FavoritesClientProps {
  products: SafeProduct[]
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  products,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {products.map((product: SafeProduct) => (
          <ProductCard
            currentUser={currentUser}
            key={product.id}
            data={product}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
