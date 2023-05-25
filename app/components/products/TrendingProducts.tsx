'use client'

import { SafeProduct } from '@/app/types'
import ProductCard from './ProductCard'
import { useRouter } from 'next/navigation'

interface TrendingProductsProps {
  products: SafeProduct[]
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  const router = useRouter()
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Trending products
          </h2>
          <div
            onClick={() => router.push('/products')}
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block cursor-pointer"
          >
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>

        <div
          onClick={() => router.push('/products')}
          className="mt-8 text-sm md:hidden text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          Shop the collection<span aria-hidden="true"> &rarr;</span>
        </div>
      </div>
    </div>
  )
}

export default TrendingProducts
