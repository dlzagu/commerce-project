'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search = () => {
  return (
    <div className="flex lg:ml-6">
      <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  )
}

export default Search
