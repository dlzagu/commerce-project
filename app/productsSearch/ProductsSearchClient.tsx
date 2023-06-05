'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { Category } from '@prisma/client'
import { DEFAULT_SIZES, PRODUCTS_PER_PAGE } from '../constants'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import EmptyState from '../components/EmptyState'
import PaginationButtons from '../components/PaginationButtons'
import SearchForm from '../components/search/SearchForm'

interface ProductsSearchClientProps {
  products: SafeProduct[]
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

  const { register, watch, setValue } = useForm({
    defaultValues: {
      category: [] as (string | null)[],
      sizes: [] as (string | null)[],
      sort: '',
      page: '',
      keyword: '',
    },
  })

  const watchCategory = watch('category')
  const watchSizes = watch('sizes')
  const watchSort = watch('sort')
  const watchPage = watch('page')
  const watchKeyword = watch('keyword')

  const [activeFilters, setActiveFilters] = useState<(string | null)[]>([])

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

  const handleUpdateSort = (value: string) => {
    setValue('sort', value)
  }
  const onClickFilter = useCallback(() => {
    let updatedQuery: any = {
      category: watchCategory,
      sizes: watchSizes,
    }

    if (watchSort !== '') {
      updatedQuery = {
        ...updatedQuery,
        sort: watchSort,
      }
    }
    if (watchPage !== '') {
      updatedQuery = {
        ...updatedQuery,
        page: 1,
      }
    }
    if (watchKeyword !== '') {
      updatedQuery = {
        ...updatedQuery,
        searchKeyword: watchKeyword,
      }
    }

    const url = qs.stringifyUrl(
      {
        url: '/productsSearch/',
        query: updatedQuery,
      },
      { skipNull: true, arrayFormat: 'comma' }
    )

    router.push(url)
  }, [watchCategory, watchSizes, watchSort, watchKeyword, router])

  const removeFilter = (value: string) => {
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
    setValue('category', parseQuery('category'))
    setValue('sizes', parseQuery('sizes'))
    setValue('sort', parseQuery('sort').join('') || '')
    setValue('page', parseQuery('page').join('') || '')
    setValue('keyword', parseQuery('searchKeyword').join('') || '')
  }, [])

  useEffect(() => {
    setActiveFilters([...watchCategory, ...watchSizes])
    onClickFilter()
  }, [watchCategory, watchSizes, watchSort, watchKeyword])

  return (
    <Container>
      <SearchForm register={register} id={'keyword'} />
      <ProductFilter
        watchSort={watchSort}
        watchSizes={watchSizes}
        watchCategory={watchCategory}
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
