import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar/Navbar'
import { ClientOnly } from './components/ClientOnly'
import { RegisterModal } from './components/modals/RegisterModal'
import { LoginModal } from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { RentModal } from './components/modals/RentModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'AirBnB Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressContentEditableWarning={true} suppressHydrationWarning={true}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
