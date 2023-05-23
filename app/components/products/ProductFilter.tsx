'use client'

import { Fragment } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from '@headlessui/react'
import { HiX, HiChevronDown } from 'react-icons/hi'
import { sortOptions } from '@/app/constants'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface ProductFilterProps {
  watchSort: string
  watchSizes: (string | null)[]
  watchCategory: (string | null)[]
  activeFilters: (string | null)[]
  filters: { id: string; name: string; options: string[] }[]
  removeFilter: (value: string) => void
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
  open: boolean
  isSearch?: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  watchSort,
  watchSizes,
  watchCategory,
  activeFilters,
  open,
  filters,
  setOpen,
  setValue,
  register,
  isSearch,
  removeFilter,
}) => {
  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 sm:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.name}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <HiChevronDown
                                className={classNames(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-5 w-5 transform'
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((value) => {
                              const optionValue = value
                              let isChecked = false

                              if (section.id === 'category') {
                                isChecked = watchCategory.includes(optionValue)
                              } else if (section.id === 'sizes') {
                                isChecked = watchSizes.includes(optionValue)
                              }

                              return (
                                <div key={value} className="flex items-center">
                                  <input
                                    {...register(`${section.id}` as any)}
                                    id={section.id}
                                    value={value}
                                    type="checkbox"
                                    checked={isChecked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 text-sm text-gray-500">
                                    {value}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {isSearch && (
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
                {...register('keyword')}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="relative z-10 bg-white border-b border-gray-200 pb-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <HiChevronDown
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setValue('sort', option.id) // 클릭 이벤트에서 setValue를 사용하여 sort 상태 업데이트
                            }}
                            className={classNames(
                              watchSort == option.id
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <Popover
                      key={section.name}
                      className="px-4 relative inline-block text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? (
                          <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                            {watchCategory.length}
                          </span>
                        ) : null}
                        <HiChevronDown
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((value) => {
                              const optionValue = value
                              let isChecked = false

                              if (section.id === 'category') {
                                isChecked = watchCategory.includes(optionValue)
                              } else if (section.id === 'sizes') {
                                isChecked = watchSizes.includes(optionValue)
                              }
                              return (
                                <div key={value} className="flex items-center">
                                  <input
                                    {...register(`${section.id}` as any)}
                                    id={section.id}
                                    value={value}
                                    type="checkbox"
                                    checked={isChecked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {value}
                                  </label>
                                </div>
                              )
                            })}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
            />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters.map((activeFilter) => (
                  <span
                    key={activeFilter}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{activeFilter}</span>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => removeFilter(activeFilter as any)} // Remove filter 버튼 이벤트 처리
                    >
                      <span className="sr-only">
                        Remove filter for {activeFilter}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductFilter
