'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { SafeProduct, SafeUser } from '@/app/types'

import HeartButton from '../HeartButton'
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
  currentUser,
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

  const { name, price, id, image } = data

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
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={image}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton productId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{name}</div>
        <div className="font-light text-neutral-500"></div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">{price} 원</div>
        </div>
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
