import { useSearchParams } from 'next/navigation'
import qs from 'query-string'

const useQueryParser = () => {
  const params = useSearchParams()

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

  return { parseQuery }
}

export default useQueryParser
