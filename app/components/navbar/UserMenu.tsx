'use client'

import { useCallback, useState, Fragment } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import MenuItem from './MenuItem'
import Search from './Search'
import Cart from './Cart'
import qs from 'query-string'
import { SafeUser } from '@/app/types'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const navigation = {
  Shop: [
    {
      my: [
        { name: 'Order', route: 'orders' },
        { name: 'Cart', route: 'cart' },
        { name: 'likes', route: 'favorites' },
      ],
      categories: [
        { name: 'All', route: 'products' },
        { name: 'Ring', route: 'RING' },
        { name: 'Necklace', route: 'Necklace' },
        { name: 'Bracelect', route: 'Bracelect' },
      ],
    },
  ],
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [open, setOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setOpen((value) => !value)
  }, [])
  const handleClick = (category: string) => {
    const url = qs.stringifyUrl(
      {
        url: '/products/',
        query: {
          category: category,
        },
      },
      { skipNull: true }
    )

    router.push(url)
    setOpen(false)
  }
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 justify-end"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <div className="mt-2">
                <div className="border-b border-gray-200 flex justify-center">
                  <div className="text-stone-900  whitespace-nowrap py-4 px-1 text-base font-medium">
                    ZHURO
                  </div>
                </div>
                <div>
                  {navigation.Shop.map((category, categoryIdx) => (
                    <div
                      key={categoryIdx}
                      className="px-4 pt-10 pb-6 space-y-12"
                    >
                      <div className="grid grid-cols-1 items-start gap-y-10 gap-x-6">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p
                              id="mobile-categories-heading"
                              className="font-medium text-gray-900"
                            >
                              Shop
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-categories-heading"
                              className="mt-2"
                            >
                              {category.categories.map((item, itemIdx) => (
                                <MenuItem
                                  key={itemIdx}
                                  label={item.name}
                                  onClick={
                                    item.name == 'All'
                                      ? () => router.push(item.route)
                                      : () => handleClick(item.route)
                                  }
                                />
                              ))}
                            </ul>
                          </div>
                        </div>
                        {currentUser && (
                          <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                            <div>
                              <p
                                id="mobile-my-heading"
                                className="font-medium text-gray-900"
                              >
                                My
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="mobile-my-heading"
                                className="mt-2"
                              >
                                {currentUser.userType == 'Admin' && (
                                  <MenuItem
                                    label={'Admin'}
                                    onClick={() => router.push('/admin')}
                                  />
                                )}
                                {category.my.map((item, itemIdx) => (
                                  <MenuItem
                                    key={itemIdx}
                                    label={item.name}
                                    onClick={() => router.push(item.route)}
                                  />
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {currentUser ? (
                  <>
                    <MenuItem label="Logout" onClick={signOut} />
                  </>
                ) : (
                  <>
                    <MenuItem label="Login" onClick={loginModal.onOpen} />
                    <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default UserMenu
