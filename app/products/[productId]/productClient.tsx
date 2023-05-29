'use client'

import Container from '@/app/components/Container'
import { SafeProduct, SafeUser } from '@/app/types'
import { useState } from 'react'
import Gallery from '@/app/components/products/Gallery'
import { LIMIT_CART_SIZE } from '@/app/constants'
import useCartItem from '@/app/hooks/useCartItem'
import { toast } from 'react-hot-toast'
import ProductInfo from '@/app/components/products/ProductInfo'
import SizeGuideModal from '@/app/components/modals/SizeGuideModal'

interface ProductClientProps {
  product: SafeProduct
  currentUser: SafeUser | null
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  currentUser,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { cartItems, addItem } = useCartItem()
  const [isOpne, setIsOpen] = useState(false)
  const { id, name, images, price } = product

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error(`사이즈를 선택해주세요`)
    if (cartItems.length >= LIMIT_CART_SIZE) {
      return toast.error(
        `장바구니는 ${LIMIT_CART_SIZE} 개의 상품이 최대입니다.`
      )
    }
    addItem({
      id,
      name,
      image: images[0],
      size: selectedSize,
      price,
      quantity: 1,
    })

    setTimeout(() => {
      toast.success('추가 완료')
    }, 200)
  }

  return (
    <Container>
      <div className="p-4 mx-auto max-w-2xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <Gallery images={images} />

          {/* Product info */}
          <ProductInfo
            product={product}
            onAction={handleAddToCart}
            currentUser={currentUser}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
      <SizeGuideModal isOpen={isOpne} setIsOpen={setIsOpen} />
    </Container>
  )
}

export default ProductClient
