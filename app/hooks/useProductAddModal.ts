import { create } from 'zustand'

interface ProductAddModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useProductAddModal = create<ProductAddModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useProductAddModal
