import { Category } from '@prisma/client'
import { useCallback } from 'react'
import Button from '../Button'
import Image from 'next/image'

interface CategoryPeviewsProps {
  categories: Category[]
}

const CategoryPreviews: React.FC<CategoryPeviewsProps> = ({ categories }) => {
  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-stone-800 hover:text-stone-500 sm:block"
          >
            all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 relative">
            <img
              src={categories[1].image}
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-center object-cover group-hover:opacity-75"
            />

            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="p-6 flex items-end absolute bottom-0 left-0 right-0">
              <div>
                <h3 className="font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {categories[1].name}
                  </a>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  {categories[1].description}
                </p>
              </div>
            </div>
          </div>

          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden relative sm:relative sm:aspect-none sm:h-full">
            <img
              src={categories[0].image}
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
            />
            <div className="p-6 absolute bottom-0 left-0 right-0">
              <div className="text-white">
                <h3 className="font-semibold">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {categories[0].name}
                  </a>
                </h3>
                <p className="mt-1 text-sm">{categories[0].description} </p>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden relative sm:relative sm:aspect-none sm:h-full">
            <img
              src={categories[2].image}
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
            />
            <div className="p-6 absolute bottom-0 left-0 right-0">
              <div className="text-white">
                <h3 className="font-semibold">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {categories[2].name}
                  </a>
                </h3>
                <p className="mt-1 text-sm">{categories[2].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-stone-800 hover:text-stone-500"
          >
            all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CategoryPreviews
