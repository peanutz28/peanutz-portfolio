import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Ria | Penn M&T Builder',
  description: "Freshman at Penn M&T studying computer engineering and finance. Building things at the intersection of hardware, AI, and financial systems.",
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
