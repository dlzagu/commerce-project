'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import useCategoryAddModal from '@/app/hooks/useCategoryAddModal'

import Modal from '../Modal'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import Heading from '../Heading'

const CategoryModal = () => {
  const router = useRouter()
  const categoryModal = useCategoryAddModal()
  const [isLoading, setIsLoading] = useState(false)

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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={categoryModal.isOpen}
      title="카테고리 등록"
      actionLabel="등록"
      onSubmit={handleSubmit(onSubmit)}
      onClose={categoryModal.onClose}
      body={bodyContent}
    />
  )
}

export default CategoryModal
