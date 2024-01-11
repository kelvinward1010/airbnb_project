import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar/Navbar'
import { ClientOnly } from './components/ClientOnly'
import { RegisterModal } from './components/modals/RegisterModal'
import { LoginModal } from './components/modals/LoginModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'AirBnB Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressContentEditableWarning={true} suppressHydrationWarning={true}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
