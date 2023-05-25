import React, { useCallback, useState } from 'react'
import qs from 'query-string'
import { FieldValues, useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'

const Search = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  })

  const watchSearch = watch('search')

  const onSubmit = useCallback(() => {
    let currentQuery = {}

    const updatedQuery: any = {
      ...currentQuery,
      searchKeyword: watchSearch,
    }

    const url = qs.stringifyUrl(
      {
        url: '/productsSearch/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [watchSearch])

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar)
  }

  const closeSearchBar = () => {
    setShowSearchBar(false)
  }

  return (
    <div className="flex lg:ml-6">
      <div
        className="p-2  text-gray-700 hover:text-gray-500"
        onClick={toggleSearchBar}
      >
        <span className="sr-only">Search</span>
        <HiMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
      </div>
      {showSearchBar && (
        <div className="flex items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center relative"
          >
            <input
              id="search"
              type="text"
              placeholder="Search..."
              {...register('search')}
              className="px-4 py-2 pl-10 bg-white border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
            />
            <button type="submit" className="hidden">
              Search
            </button>
            <div
              className="absolute cursor-pointer inset-y-0 left-0 flex items-center py-2 pl-3 text-gray-400 hover:text-gray-500"
              onClick={closeSearchBar}
            >
              <HiX className="h-4 w-4" aria-hidden="true" />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Search
