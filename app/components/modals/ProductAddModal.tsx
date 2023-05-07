'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import useProductAddModal from '@/app/hooks/useProductAddModal'
import { Category } from '@prisma/client'

import Modal from '../Modal'
import SelectInput from '../inputs/SelectInput'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import Heading from '../Heading'
import { DEFAULT_SIZES } from '@/app/constants'

interface ProductAddClientProps {
  categories: Category[]
}
enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  SIZES = 3,
  PRICE = 4,
}

const ProductAddModal: React.FC<ProductAddClientProps> = ({ categories }) => {
  const router = useRouter()
  const productModal = useProductAddModal()

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categoryId: '',
      image: '',
      price: 1,
      sizes: [],
      quantity: 0,
      name: '',
      description: '',
    },
  })

  const categoryId = watch('categoryId')
  const sizes = watch('sizes')
  const image = watch('image')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const handleSize = (size: string) => {
    const sizes = getValues('sizes')
    if (sizes.includes(size)) {
      setValue(
        'sizes',
        sizes.filter((cur: string) => cur !== size)
      )
    } else {
      setValue('sizes', [...sizes, size])
    }
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    axios
      .post('/api/products', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        productModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return '상품 추가'
    }

    return '다음'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return '이전'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="카테고리를 선택해주세요." />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.name} className="col-span-1">
            <SelectInput
              onClick={(categoryId) => setCustomValue('categoryId', categoryId)}
              actionLabel={item.id}
              selected={categoryId === item.id}
              label={item.name}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="메인 사진을 업로드해주세요." />
        <ImageUpload
          onChange={(value) => setCustomValue('image', value)}
          value={image}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="제품과 내용을 입력해주세요." />
        <Input
          id="name"
          label="상품이름"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="상품소개"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
  if (step === STEPS.SIZES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="재고가 있는 사이즈를 선택해주세요." />
        <div
          className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
        >
          {DEFAULT_SIZES.map((size) => (
            <div key={size} className="col-span-1">
              <SelectInput
                onClick={handleSize}
                actionLabel={size}
                selected={sizes.includes(size)}
                label={size}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="가격과 재고를 입력해주세요." />
        <Input
          id="price"
          label="가격(원)"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="quantity"
          label="수량"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={productModal.isOpen}
      title="상품등록"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={productModal.onClose}
      body={bodyContent}
    />
  )
}

export default ProductAddModal
