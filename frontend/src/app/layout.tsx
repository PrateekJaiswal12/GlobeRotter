import './globals.css'
import type { Metadata } from 'next'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Globetrotter',
  description: 'A fun geography guessing game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
