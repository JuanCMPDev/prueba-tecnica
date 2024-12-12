import type { Metadata } from "next"
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import "./globals.css"
import { NavBar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

const ibmPlexSans = IBM_Plex_Sans({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

export const metadata: Metadata = {
  title: "QuickBet Movies",
  description: "Your favorite movies streaming platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibmPlexSans.variable} bg-black text-white`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}

