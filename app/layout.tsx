import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat-var',
  weight: ['400', '500', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-var',
  style: ['italic'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Not a Croissant™ — Medialunas, Made in New York',
  description: 'Not a Croissant™ brings authentic medialunas to New York City. Pre-orders open via Instagram DM.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: 'var(--font-montserrat-var), sans-serif' }}>{children}</body>
    </html>
  )
}
