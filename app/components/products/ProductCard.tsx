'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SafeProduct, SafeUser } from '@/app/types'

import Button from '../Button'

interface ProductCardProps {
  data: SafeProduct
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
  secondaryAction?: (id: string) => void
  secondaryActionLabel?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  secondaryAction,
  secondaryActionLabel,
}) => {
  const router = useRouter()

  const handleCreate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [disabled, onAction, actionId]
  )

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      secondaryAction?.(actionId)
    },
    [disabled, secondaryAction, actionId]
  )

  const { name, price, id, images } = data

  return (
    <div
      onClick={() => router.push(`/products/${id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            sizes="100%"
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={images[0]}
            alt="Product"
            priority
          />
        </div>

        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">925 silver</p>
        <p className="mt-1 text-sm font-medium text-gray-900">{price} won</p>
        <div className="flex flex-row items-center gap-4 w-full">
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCreate}
            />
          )}
          {secondaryAction && secondaryActionLabel && (
            <Button
              disabled={disabled}
              small
              label={secondaryActionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
