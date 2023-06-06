import { useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import qs from 'query-string'
import { useSearchParams } from 'next/navigation'

interface QueryUpdaterProps {
  watchCategory?: (string | null)[]
  watchSizes?: (string | null)[]
  watchSort?: string
  watchKeyword?: string
}

type StringifiableRecord = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | qs.Stringifiable
    | readonly qs.Stringifiable[]
}

const useQueryUpdater = () => {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const updateQuery = useCallback(
    (queryData: QueryUpdaterProps) => {
      let currentQuery = {}

      if (params) {
        currentQuery = qs.parse(params.toString())
      }
      const { watchCategory, watchSizes, watchSort, watchKeyword } = queryData

      let updatedQuery: StringifiableRecord = {
        ...currentQuery,
        category: watchCategory,
        sizes: watchSizes,
        searchKeyword: watchKeyword,
      }

      if (watchSort !== '') {
        updatedQuery = {
          ...updatedQuery,
          sort: watchSort,
        }
      }

      const url = qs.stringifyUrl(
        {
          url: pathname || 'products',
          query: updatedQuery,
        },
        { skipNull: true, arrayFormat: 'comma' }
      )

      router.push(url)
    },
    [router]
  )

  return { updateQuery }
}

export default useQueryUpdater
