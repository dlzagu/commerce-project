'use client'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import Button from '../components/Button'
import { BiCategoryAlt } from 'react-icons/bi'
import { SiProducthunt } from 'react-icons/si'
import useCategoryAddModal from '../hooks/useCategoryAddModal'
const AdminClient = () => {
  const categoryModal = useCategoryAddModal()
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
          onClick={() => console.log('ji')}
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
      ></div>
    </Container>
  )
}

export default AdminClient
