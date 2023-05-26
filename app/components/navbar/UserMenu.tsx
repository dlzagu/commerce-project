'use client'

import { useCallback, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import MenuItem from './MenuItem'
import Search from './Search'
import Cart from './Cart'
import { SafeUser } from '@/app/types'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Search />
        <div
          onClick={toggleOpen}
          className="
          p-4
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer
          hover:scale-110
          transition
          sm:border-none 
          sm:rounded-none
          "
        >
          <CiMenuBurger className="h-4 w-4 sm:h-6 sm:w-6" />
        </div>
        <Cart />
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {currentUser.userType == 'Admin' && (
                  <MenuItem
                    label="Admin"
                    onClick={() => router.push('/admin')}
                  />
                )}
                <MenuItem
                  label="Store"
                  onClick={() => router.push('/products')}
                />
                <MenuItem
                  label="Likes"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem label="Cart" onClick={() => router.push('/cart')} />
                <MenuItem
                  label="My order"
                  onClick={() => router.push('/orders')}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Store"
                  onClick={() => router.push('/products')}
                />
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
