import { create } from 'zustand'

interface ProductEditModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useProductEditModal = create<ProductEditModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useProductEditModal
