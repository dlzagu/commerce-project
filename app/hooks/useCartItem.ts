import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  image: string
  size: string
  price: number
  quantity: number
}

interface CartStore {
  cartItems: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (idx: number) => void
}

const useCartItem = create<CartStore>(
  (persist as any)(
    (set: any) => ({
      cartItems: [],
      addItem: (item: CartItem) =>
        set((state: CartStore) => ({ cartItems: [...state.cartItems, item] })),
      removeItem: (idx: number) =>
        set((state: CartStore) => ({
          cartItems: state.cartItems.filter((_, index) => index !== idx),
        })),
    }),
    {
      name: 'cart-storage', // 로컬 저장소 키 설정
      getStorage: () => localStorage, // 로컬 저장소 사용
    }
  )
)

export default useCartItem
