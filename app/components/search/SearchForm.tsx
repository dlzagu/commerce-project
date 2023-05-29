'use client'

import { useRouter } from 'next/navigation'
import { UseFormRegister } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'

interface SearchFormProps {
  register: UseFormRegister<any>
  id: string
}

const SearchForm: React.FC<SearchFormProps> = ({ register, id }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        Search
      </h1>
      <p className="mt-4 max-w-xl text-sm text-gray-700">
        Search for a product
      </p>

      <div className="flex items-center mt-5">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiMagnifyingGlass className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full pl-10 p-2.5"
            placeholder="Search"
            {...register(id)}
            required
          />
        </div>
      </div>
    </div>
  )
}

export default SearchForm
