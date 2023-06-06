'use client'

import { useState } from 'react'
import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { Category } from '@prisma/client'
import { DEFAULT_SIZES, PRODUCTS_PER_PAGE } from '../constants'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import EmptyState from '../components/EmptyState'
import PaginationButtons from '../components/PaginationButtons'
import SearchForm from '../components/search/SearchForm'
import useProductFilter from '../hooks/useProductFilter'

interface ProductsSearchClientProps {
  products: SafeProduct[]
  categories: Category[]
}

const ProductsSearchClient: React.FC<ProductsSearchClientProps> = ({
  products,
  categories,
}) => {
  const categoriesValue = categories.map((category) => category.name)
  const [open, setOpen] = useState(false)
  const { register, handleUpdateSort, activeFilters, watch, removeFilter } =
    useProductFilter()

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
      <SearchForm register={register} id={'keyword'} />
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
      {products?.length == 0 && (
        <EmptyState
          title="No results were found for your search."
          subtitle="
        Try searching with a different search term."
        />
      )}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <PaginationButtons
        disableNextPage={products.length < PRODUCTS_PER_PAGE}
        route="productsSearch"
      />
    </Container>
  )
}

export default ProductsSearchClient
