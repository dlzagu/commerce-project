'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      alt="Logo"
      className="cursor-pointer w-20"
      height={100}
      width={200}
      src="/images/logo.png"
      onClick={() => router.push('/')}
    />
  )
}

export default Logo
