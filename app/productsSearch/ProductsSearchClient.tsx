'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { Category } from '@prisma/client'
import { DEFAULT_SIZES } from '../constants'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import EmptyState from '../components/EmptyState'

interface ProductsSearchClientProps {
  products?: SafeProduct[]
  categories: Category[]
}

const ProductsSearchClient: React.FC<ProductsSearchClientProps> = ({
  products,
  categories,
}) => {
  const router = useRouter()
  const params = useSearchParams()
  const categoriesValue = categories.map((category) => category.name)
  const [open, setOpen] = useState(false)
  const parseQuery = (queryKey: string) => {
    if (params) {
      const parsedParams = qs.parse(params.toString(), {
        arrayFormat: 'comma',
      })

      const queryValue = parsedParams[queryKey]
      if (!queryValue) {
        return []
      }

      return Array.isArray(queryValue) ? queryValue : [queryValue]
    } else return []
  }

  const initialCategories = parseQuery('category')
  const initialSizes = parseQuery('sizes')
  const initialSort =
    parseQuery('sort').join('').length == 0
      ? 'new'
      : parseQuery('sort').join('')
  const initialkeyword =
    parseQuery('searchKeyword').join('').length == 0
      ? ''
      : parseQuery('searchKeyword').join('')

  const { register, watch, setValue } = useForm({
    defaultValues: {
      category: initialCategories || [],
      sizes: initialSizes || [],
      sort: initialSort,
      keyword: initialkeyword,
    },
  })

  const watchCategory = watch('category')
  const watchSizes = watch('sizes')
  const watchSort = watch('sort')
  const watchKeyword = watch('keyword')

  const [activeFilters, setActiveFilters] = useState([
    ...parseQuery('category'),
    ...parseQuery('sizes'),
  ])

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

  const removeFilter = (value: string) => {
    let updatedActiveFilters = [...activeFilters].filter(
      (filter) => filter != value
    )
    setActiveFilters(updatedActiveFilters)
    if (watchCategory.includes(value)) {
      let updatedCategory = [...watchCategory].filter(
        (category) => category != value
      )
      setValue('category', updatedCategory)
    } else {
      let updatedSizes = [...watchSizes].filter((size) => size != value)
      setValue('sizes', updatedSizes)
    }
  }

  useEffect(() => {
    const updatedQuery: any = {
      category: watchCategory,
      sizes: watchSizes,
      sort: watchSort,
      searchKeyword: watchKeyword,
    }
    setActiveFilters([...watchCategory, ...watchSizes])

    const url = qs.stringifyUrl(
      {
        url: '/productsSearch/',
        query: updatedQuery,
      },
      { skipNull: true, arrayFormat: 'comma' }
    )

    router.push(url)
  }, [watchCategory, watchSizes, watchSort, watchKeyword])

  return (
    <Container>
      <ProductFilter
        watchSort={watchSort}
        watchSizes={watchSizes}
        watchCategory={watchCategory}
        activeFilters={activeFilters}
        filters={filters}
        removeFilter={removeFilter}
        setValue={setValue}
        register={register}
        open={open}
        setOpen={setOpen}
        isSearch={true}
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
    </Container>
  )
}

export default ProductsSearchClient
