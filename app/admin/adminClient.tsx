'use client'

import Container from '@/app/components/Container'
import Button from '../components/Button'
import { BiCategoryAlt } from 'react-icons/bi'
import { SiProducthunt } from 'react-icons/si'
import qs from 'query-string'
import useCategoryAddModal from '../hooks/useCategoryAddModal'
import useProductAddModal from '../hooks/useProductAddModal'
import ProductCard from '../components/products/ProductCard'
import { SafeProduct, SafeUser } from '../types'
import { useCallback, useEffect, useState } from 'react'
import useProductEditModal from '../hooks/useProductEditModal'
import ProductEditModal from '../components/modals/ProductEditModal'
import { Category } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import SearchForm from '../components/search/SearchForm'
import { useForm } from 'react-hook-form'
import PaginationButtons from '../components/PaginationButtons'
import { PRODUCTS_PER_PAGE } from '../constants'

interface AdminClientProps {
  products: SafeProduct[]
  currentUser?: SafeUser | null
  categories: Category[]
}

const AdminClient: React.FC<AdminClientProps> = ({ products, categories }) => {
  const router = useRouter()
  const categoryModal = useCategoryAddModal()
  const productAddModal = useProductAddModal()
  const productEditModal = useProductEditModal()
  const [selectedProduct, setSelectedProduct] = useState<SafeProduct | null>(
    null
  )
  const [deletingId, setDeletingId] = useState('')

  const { register, watch } = useForm({
    defaultValues: {
      keyword: '',
    },
  })

  const watchKeyword = watch('keyword')

  const onEdit = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    setSelectedProduct(product || null)
    productEditModal.onOpen()
  }

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/products/${id}`)
        .then(() => {
          toast.success('Product deleted')
          router.refresh()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  useEffect(() => {
    let updatedQuery: any = {}

    if (watchKeyword !== '') {
      updatedQuery = {
        searchKeyword: watchKeyword,
      }
    }

    const url = qs.stringifyUrl({
      url: '/admin/',
      query: updatedQuery,
    })

    router.push(url)
  }, [watchKeyword])

  return (
    <Container>
      <SearchForm register={register} id={'keyword'} />
      <div className="flex gap-4 mt-3 flex-col sm:flex-row">
        <Button
          outline
          label="category registration"
          icon={BiCategoryAlt}
          onClick={categoryModal.onOpen}
        />
        <Button
          outline
          label="product registration"
          icon={SiProducthunt}
          onClick={productAddModal.onOpen}
        />
      </div>

      <div
        className="
        mt-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
      >
        {products.map((product: SafeProduct) => (
          <ProductCard
            key={product.id}
            data={product}
            actionLabel="Edit"
            onAction={onEdit}
            secondaryActionLabel="Delete"
            secondaryAction={onCancel}
            actionId={product.id}
            disabled={deletingId === product.id}
          />
        ))}
      </div>

      <PaginationButtons
        disableNextPage={products.length < PRODUCTS_PER_PAGE}
        route="admin"
      />
      <ProductEditModal categories={categories} product={selectedProduct} />
    </Container>
  )
}

export default AdminClient
