import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Container from '@/components/global/Container'
import Providers from './providers'
import Navbar from '@/components/navbar/Navbar'
import { ClerkProvider } from '@clerk/nextjs'

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'books-app',
  description: 'Gestore personale libri',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Providers>
            <Navbar />
            <Container className="py-20 flex-1">{children}</Container>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
