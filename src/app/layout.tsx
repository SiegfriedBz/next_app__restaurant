import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProviders } from './context/AuthProviders'
import { AppContextProvider } from './context/appContext'

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`text-dark dark:text-light ${roboto.className}`}>
        <AuthProviders>
          <AppContextProvider>
            <Header />
            {/* fixed header with h-24 */}
            <main className='mt-24'>{children}</main>
            <Footer />
          </AppContextProvider>
        </AuthProviders>
      </body>
    </html>
  )
}
