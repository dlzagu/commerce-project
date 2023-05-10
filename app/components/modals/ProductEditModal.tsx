'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import useProductEditModal from '@/app/hooks/useProductEditModal'
import { Category } from '@prisma/client'
import { SafeProduct } from '@/app/types'

import Modal from '../Modal'
import SelectInput from '../inputs/SelectInput'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import Heading from '../Heading'
import { DEFAULT_SIZES } from '@/app/constants'

interface ProductEditClientProps {
  categories?: Category[]
  product: SafeProduct | null
}
enum STEPS {
  CATEGORY = 0,
  MAIN_IMAGE = 1,
  SUB_IMAGE = 2,
  SUB_IMAGE2 = 3,
  DESCRIPTION = 4,
  SIZES = 5,
  PRICE = 6,
}

const ProductEditModal: React.FC<ProductEditClientProps> = ({
  categories,
  product,
}) => {
  const router = useRouter()
  const productEditModal = useProductEditModal()
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
      name: product?.name,
      categoryId: product?.categoryId,
      images: product?.images,
      price: product?.price,
      sizes: product?.sizes,
      quantity: product?.quantity,
      description: product?.description,
    },
  })
  useEffect(() => {
    reset({
      name: product?.name,
      categoryId: product?.categoryId,
      images: product?.images,
      price: product?.price,
      sizes: product?.sizes,
      quantity: product?.quantity,
      description: product?.description,
    })
  }, [product, reset])

  const categoryId = watch('categoryId')
  const sizes = watch('sizes')
  const images = watch('images')

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
      .put(`/api/products/${product?.id}`, data)
      .then(() => {
        toast.success('상품 수정 완료')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        productEditModal.onClose()
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
      return '상품 수정'
    }

    return '다음'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return '이전'
  }, [step])

  useEffect(() => {
    console.log(product)
  }, [product])

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
        {categories?.map((item) => (
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

  if (step === STEPS.MAIN_IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="메인 이미지를 업로드해주세요." />
        <ImageUpload
          onChange={(value) => {
            if (images[0]) {
              const newImages = [...images]
              newImages[0] = value
              setCustomValue('images', newImages)
            } else setCustomValue('images', [...images, value])
          }}
          value={images[0]}
        />
      </div>
    )
  }

  if (step === STEPS.SUB_IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="서브 이미지를 업로드해주세요." />
        <ImageUpload
          onChange={(value) => {
            if (images[1]) {
              const newImages = [...images]
              newImages[1] = value
              setCustomValue('images', newImages)
            } else setCustomValue('images', [...images, value])
          }}
          value={images[1]}
        />
      </div>
    )
  }

  if (step === STEPS.SUB_IMAGE2) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="두번째 서브이미지를 업로드해주세요." />
        <ImageUpload
          onChange={(value) => {
            if (images[2]) {
              const newImages = [...images]
              newImages[2] = value
              setCustomValue('images', newImages)
            } else setCustomValue('images', [...images, value])
          }}
          value={images[2]}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="제품과 내용을 수정해주세요." />
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
        <Heading title="가격과 재고를 수정해주세요." />
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
      isOpen={productEditModal.isOpen}
      title="상품수정"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={productEditModal.onClose}
      body={bodyContent}
    />
  )
}

export default ProductEditModal
