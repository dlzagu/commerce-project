'use client'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import Button from '../components/Button'
import { BiCategoryAlt } from 'react-icons/bi'
import { SiProducthunt } from 'react-icons/si'
import useCategoryAddModal from '../hooks/useCategoryAddModal'
import useProductAddModal from '../hooks/useProductAddModal'
import ProductCard from '../components/products/ProductCard'
import { SafeProduct, SafeUser } from '../types'
import { useCallback, useState } from 'react'
import useProductEditModal from '../hooks/useProductEditModal'
import ProductEditModal from '../components/modals/ProductEditModal'
import { Category } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface AdminClientProps {
  products: SafeProduct[]
  currentUser?: SafeUser | null
  categories: Category[]
}

const AdminClient: React.FC<AdminClientProps> = ({
  currentUser,
  products,
  categories,
}) => {
  const router = useRouter()
  const categoryModal = useCategoryAddModal()
  const productAddModal = useProductAddModal()
  const productEditModal = useProductEditModal()
  const [selectedProduct, setSelectedProduct] = useState<SafeProduct | null>(
    null
  )
  const [deletingId, setDeletingId] = useState('')

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
          toast.success('상품삭제 완료')
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

  return (
    <Container>
      <Heading title="상품등록" subtitle="상품을 등록하고 수정해주세요!" />
      <div className="flex gap-4 mt-3">
        <Button
          outline
          label="카테고리 등록하기"
          icon={BiCategoryAlt}
          onClick={categoryModal.onOpen}
        />
        <Button
          outline
          label="상품 등록하기"
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
        {products.map((product: any) => (
          <ProductCard
            currentUser={currentUser}
            key={product.id}
            data={product}
            actionLabel="수정"
            onAction={onEdit}
            secondaryActionLabel="삭제"
            secondaryAction={onCancel}
            actionId={product.id}
            disabled={deletingId === product.id}
          />
        ))}
      </div>
      <ProductEditModal categories={categories} product={selectedProduct} />
    </Container>
  )
}

export default AdminClient
