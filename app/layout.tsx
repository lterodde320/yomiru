import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './providers'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yomiru',
  description: 'Your personal RSS reader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

