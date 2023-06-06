// hooks/useProductFilter.js

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useQueryParser from './useQueryParser'
import useQueryUpdater from './useQueryUpdater'

const useProductFilter = (defaultKeyword = '') => {
  const { updateQuery } = useQueryUpdater()
  const { parseQuery } = useQueryParser()
  const { register, watch, setValue } = useForm({
    defaultValues: {
      category: parseQuery('category') as (string | null)[],
      sizes: parseQuery('sizes') as (string | null)[],
      sort: parseQuery('sort').join('') || '',
      page: parseQuery('page').join('') || '',
      keyword: parseQuery('searchKeyword').join('') || defaultKeyword,
    },
  })

  const [activeFilters, setActiveFilters] = useState<(string | null)[]>([])

  const handleUpdateSort = (value: string) => {
    setValue('sort', value)
  }

  const removeFilter = (value: string) => {
    if (watch('category').includes(value)) {
      const updatedCategory = [...watch('category')].filter(
        (category) => category !== value
      )
      setValue('category', updatedCategory)
    } else {
      const updatedSizes = [...watch('sizes')].filter((size) => size !== value)
      setValue('sizes', updatedSizes)
    }
  }

  useEffect(() => {
    setActiveFilters([...watch('category'), ...watch('sizes')])
    updateQuery({
      watchCategory: watch('category'),
      watchKeyword: watch('keyword'),
      watchSizes: watch('sizes'),
      watchSort: watch('sort'),
    })
  }, [watch('category'), watch('sizes'), watch('sort'), watch('keyword')])

  return {
    register,
    handleUpdateSort,
    activeFilters,
    watch,
    setValue,
    removeFilter,
  }
}

export default useProductFilter
