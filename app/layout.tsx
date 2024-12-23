import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotificationCenter from '../components/NotificationCenter'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export const metadata = {
  title: 'Mentorship',
  description: 'Manage a mentorship program for a startup incubator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className={inter.className}>
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Mentorship</h1>
                <NotificationCenter />
              </div>
            </header>
            <main>{children}</main>
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

