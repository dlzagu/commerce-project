'use client'

import Modal from '../Modal'
import Image from 'next/image'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}
const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const bodyContent = (
    <>
      <Image
        alt="sizeGuide"
        height="500"
        width="600"
        src="/images/sizeGuide.png"
      />
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      title="Size Guide"
      onClose={onClose}
      body={bodyContent}
    />
  )
}

export default SizeGuideModal
