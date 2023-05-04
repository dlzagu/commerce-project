'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useMemo } from 'react'
import { Category } from '@prisma/client'
import useCategoryAddModal from '@/app/hooks/useCategoryAddModal'

import Modal from '../Modal'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import Heading from '../Heading'

interface CategorysClientProps {
  categorys: Category[]
}

const CategoryModal: React.FC<CategorysClientProps> = ({ categorys }) => {
  const router = useRouter()
  const categoryModal = useCategoryAddModal()

  const [isLoading, setIsLoading] = useState(false)
  const [isCategorys, setIsCategorys] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      image: '',
      description: '',
    },
  })

  const image = watch('image')
  const actionLabel = useMemo(() => {
    if (isCategorys) {
      return '뒤로가기'
    }

    return '등록'
  }, [isCategorys])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, image } = data
    if (actionLabel == '뒤로가기') return setIsCategorys(false)
    if (name == '' || image == ' ') return null
    axios
      .post('/api/categorys', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        categoryModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const secondaryAction = useCallback(() => {
    setIsCategorys(true)
    console.log(categorys)
  }, [isCategorys])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="카테고리를 등록해주세요" />
      <Input
        id="name"
        label="카테고리 이름"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="카테고리 한줄 소개"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <ImageUpload
        onChange={(value) => setCustomValue('image', value)}
        value={image}
      />
    </div>
  )

  if (isCategorys) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="카테고리 목록" />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={categoryModal.isOpen}
      title="카테고리 등록"
      actionLabel={actionLabel}
      secondaryActionLabel="목록"
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={secondaryAction}
      onClose={categoryModal.onClose}
      body={bodyContent}
    />
  )
}

export default CategoryModal
