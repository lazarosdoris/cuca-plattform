import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CUCA Platform - Customer Success',
  description: 'Customer Success Management Platform powered by Lynxight',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
