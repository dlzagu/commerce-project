'use client'

import Container from '@/app/components/Container'
import { SafeProduct } from '@/app/types'
import { useState } from 'react'

import { Disclosure, RadioGroup } from '@headlessui/react'
import { HiOutlineHeart, HiMinusSm, HiPlusSm, HiStar } from 'react-icons/hi'

import Button from '@/app/components/Button'

import Gallery from '@/app/components/products/Gallery'
import { DEFAULT_SIZES, DEFAULT_DETAILS } from '@/app/constants'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface ProductClientProps {
  product: SafeProduct
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  return (
    <Container>
      <div className="p-4 mx-auto max-w-2xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <Gallery images={product.images} />

          {/* Product info */}
          <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-background">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-on-background">{product.price} won</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6 text-base text-on-background text-opacity-80">
                {product.description}
              </div>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-on-background text-opacity-80 mb-3">
                  Material
                </h3>

                <div className="sr-only">Material</div>
                <div className="flex items-center space-x-3">
                  <span
                    aria-hidden="true"
                    className={classNames(
                      'bg-neutral-400 h-8 w-8 border border-on-background border-opacity-10 rounded-full'
                    )}
                  />
                  <span className="text-sm">925 silver</span>
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-stone-900 hover:text-stone-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {DEFAULT_SIZES.map((size) => (
                      <RadioGroup.Option
                        key={size}
                        value={size}
                        disabled={!product.sizes.includes(size)}
                        className={({ active }) =>
                          classNames(
                            product.sizes.includes(size)
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-stone-900' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                            {product.sizes.includes(size) ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-stone-900'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex mt-10 sm:flex-col1">
                <Button label="Add to bag" onClick={() => {}} />
                <button
                  type="button"
                  className="flex justify-center items-center p-3 ml-4 rounded-md bg-background text-on-background hover:text-on-secondary hover:bg-secondary"
                >
                  <HiOutlineHeart
                    className="shrink-0 w-6 h-6"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-border-color">
                {DEFAULT_DETAILS.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group flex relative justify-between items-center py-6 w-full text-left">
                            <span
                              className={classNames(
                                open ? 'text-primary' : 'text-on-background',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <HiMinusSm
                                  className="block w-6 h-6 group-hover:opacity-80 text-primary"
                                  aria-hidden="true"
                                />
                              ) : (
                                <HiPlusSm
                                  className="block w-6 h-6 group-hover:opacity-80 text-on-background"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="pb-6 prose prose-sm"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item} className="text-on-background">
                                - {item}
                              </li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductClient
