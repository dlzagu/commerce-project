'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { Category } from '@prisma/client'
import { DEFAULT_SIZES, PRODUCTS_PER_PAGE } from '../constants'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import PaginationButtons from '../components/PaginationButtons'

interface ProductsClientProps {
  products: SafeProduct[]
  categories: Category[]
}

const ProductsClient: React.FC<ProductsClientProps> = ({
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
    },
  })

  const watchCategory = watch('category')
  const watchSizes = watch('sizes')
  const watchSort = watch('sort')
  const watchPage = watch('page')

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

  const onToggle = () => {
    setOpen((value) => !value)
  }

  const handleUpdateSort = (value: string) => {
    setValue('sort', value)
  }

  useEffect(() => {
    setValue('category', parseQuery('category'))
    setValue('sizes', parseQuery('sizes'))
    setValue('sort', parseQuery('sort').join('') || '')
    setValue('page', parseQuery('page').join('') || '')
  }, [params])

  useEffect(() => {
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
        page: watchPage,
      }
    }

    setActiveFilters([...watchCategory, ...watchSizes])

    const url = qs.stringifyUrl(
      {
        url: '/products/',
        query: updatedQuery,
      },
      { skipNull: true, arrayFormat: 'comma' }
    )

    router.push(url)
  }, [watchCategory, watchSizes, watchSort])

  return (
    <Container>
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
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <PaginationButtons
        disableNextPage={products.length < PRODUCTS_PER_PAGE}
        route="products"
      />
    </Container>
  )
}

export default ProductsClient
