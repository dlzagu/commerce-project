import { Nunito } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import LoginModal from '@/app/components/modals/LoginModal'
import RegisterModal from '@/app/components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'

import './globals.css'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'

export const metadata = {
  title: 'zhuro',
  description: 'welcome to zhuro shop',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
