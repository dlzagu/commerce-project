'use client'

import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'

interface PaginationButtonsProps {
  disableNextPage?: boolean
  route: string
}
const PaginationButtons = ({
  disableNextPage,
  route,
}: PaginationButtonsProps) => {
  const router = useRouter()
  const params = useSearchParams()

  let currentPage = 1
  if (params) {
    currentPage = Number(qs.parse(params.toString()).page) || 1
  }

  const handleNextPage = () => {
    if (disableNextPage) return

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      page: currentPage + 1,
    }

    const url = qs.stringifyUrl(
      {
        url: route,
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  const handlePrevPage = () => {
    if (currentPage === 1) return
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      page: currentPage - 1,
    }

    const url = qs.stringifyUrl(
      {
        url: '/products',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <div className="flex flex-row items-center justify-center my-10">
      <button
        color="secondary"
        onClick={() => handlePrevPage()}
        className="p-3"
        disabled={currentPage === 1}
      >
        <IoArrowBackOutline
          className={`text-xl ${
            currentPage === 1 ? 'text-gray-400' : 'text-stone-950'
          } `}
        />
      </button>
      <p className="mx-4 text-[16px]">Page {currentPage}</p>
      <button
        color="secondary"
        onClick={() => handleNextPage()}
        className="p-3"
        disabled={disableNextPage}
      >
        <IoArrowForwardOutline
          className={`text-xl ${
            disableNextPage ? 'text-gray-400' : 'text-stone-950'
          } `}
        />
      </button>
    </div>
  )
}

export default PaginationButtons
