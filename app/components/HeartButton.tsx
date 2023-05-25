'use client'

import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import useFavorite from '@/app/hooks/useFavorite'
import { SafeUser } from '@/app/types'

interface HeartButtonProps {
  productId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
  productId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  })

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      {hasFavorited ? (
        <HiHeart className="shrink-0 w-6 h-6" aria-hidden="true" />
      ) : (
        <HiOutlineHeart className="shrink-0 w-6 h-6" aria-hidden="true" />
      )}
    </div>
  )
}

export default HeartButton
