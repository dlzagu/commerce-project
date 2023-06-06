'use client'

import { useState } from 'react'
import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { Category } from '@prisma/client'
import { DEFAULT_SIZES, PRODUCTS_PER_PAGE } from '../constants'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import PaginationButtons from '../components/PaginationButtons'
import useProductFilter from '../hooks/useProductFilter'

interface ProductsClientProps {
  products: SafeProduct[]
  categories: Category[]
}

const ProductsClient: React.FC<ProductsClientProps> = ({
  products,
  categories,
}) => {
  const categoriesValue = categories.map((category) => category.name)
  const { register, handleUpdateSort, activeFilters, watch, removeFilter } =
    useProductFilter()
  const [open, setOpen] = useState(false)

  const filters = [
    {
      id: 'category',
      name: 'category',
      options: categoriesValue,
    },
    {
      id: 'sizes',
      name: 'sizes',
      options: DEFAULT_SIZES,
    },
  ]

  const onToggle = () => {
    setOpen((value) => !value)
  }

  return (
    <Container>
      <ProductFilter
        watchSort={watch('sort')}
        watchSizes={watch('sizes')}
        watchCategory={watch('category')}
        activeFilters={activeFilters}
        filters={filters}
        removeFilter={removeFilter}
        handleUpdateSort={handleUpdateSort}
        register={register}
        open={open}
        onToggle={onToggle}
      />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <PaginationButtons
        route="products"
        disableNextPage={products.length < PRODUCTS_PER_PAGE}
      />
    </Container>
  )
}

export default ProductsClient
