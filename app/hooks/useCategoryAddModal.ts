import { create } from 'zustand'

interface CategoryModalStroe {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useCategoryAddModal = create<CategoryModalStroe>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useCategoryAddModal
