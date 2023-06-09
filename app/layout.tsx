import { Roboto } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import LoginModal from '@/app/components/modals/LoginModal'
import RegisterModal from '@/app/components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'

import './globals.css'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'
import CategoryModal from './components/modals/CategoryAddModal'
import getCategories from './actions/getCategories'
import ProductAddModal from './components/modals/ProductAddModal'
import Footer from './components/footer/Footer'

export const metadata = {
  title: 'zhuro',
  description: 'welcome to zhuro shop',
}

const font = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  const categories = await getCategories()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <CategoryModal categories={categories} />
          <ProductAddModal categories={categories} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
