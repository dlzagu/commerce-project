'use client'

import { Category } from '@prisma/client'
import qs from 'query-string'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CategoryPeviewsProps {
  categories: Category[]
}

const CategoryPreviews: React.FC<CategoryPeviewsProps> = ({ categories }) => {
  const router = useRouter()

  const handleClick = (category: string) => {
    const url = qs.stringifyUrl(
      {
        url: '/products/',
        query: {
          category: category,
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }
  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <div
            onClick={() => router.push('/products')}
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500  sm:block"
          >
            all products<span aria-hidden="true"> &rarr;</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div
            onClick={() => handleClick(categories[1].name)}
            className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 relative"
          >
            <Image
              width={600}
              height={100}
              priority
              src={categories[1].image}
              alt={categories[1].name}
              className="object-center object-cover group-hover:opacity-75"
            />

            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="p-6 flex items-end absolute bottom-0 left-0 right-0">
              <div>
                <h3 className="font-semibold text-white">
                  <span className="absolute inset-0" />
                  {categories[1].name}
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  {categories[1].description}
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleClick(categories[0].name)}
            className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden relative sm:relative sm:aspect-none sm:h-full"
          >
            <Image
              width={600}
              height={300}
              priority
              src={categories[0].image}
              alt={categories[0].name}
              className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
            />
            <div className="p-6 absolute bottom-0 left-0 right-0">
              <div className="text-white">
                <h3 className="font-semibold sm:text-xs md:text-sm">
                  <span className="absolute inset-0" />
                  {categories[0].name}
                </h3>
                <p className="mt-1 text-sm sm:text-xs md:text-sm">
                  {categories[0].description}{' '}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleClick(categories[2].name)}
            className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden relative sm:relative sm:aspect-none sm:h-full"
          >
            <Image
              width={600}
              height={100}
              priority
              src={categories[2].image}
              alt={categories[2].name}
              className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
            />
            <div className="p-6 absolute bottom-0 left-0 right-0">
              <div className="text-white">
                <h3 className="font-semibold sm:text-xs md:text-sm">
                  <span className="absolute inset-0" />
                  {categories[2].name}
                </h3>
                <p className="mt-1 text-sm sm:text-xs md:text-sm">
                  {categories[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <div
            onClick={() => router.push('/products')}
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            all products<span aria-hidden="true"> &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPreviews
