"use client"

import { useState } from "react"
import Link from "next/link"
import { UserCircle } from 'lucide-react'
import Image from "next/image"
import QuickbetSignupModal from "./quickbet-signup-modal"

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <nav className="w-full bg-black px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12 px-12">
          <Link href="/" className="text-xl font-bold text-white">
            <Image src={'/assets/logo.png'} width={164} height={42} alt="logo.png"/>
          </Link>
          <div className="hidden space-x-6 md:flex">
            <Link href="/popular" className="text-sm text-gray-300 hover:text-white">
              Popular
            </Link>
            <Link href="/favorites" className="text-sm text-gray-300 hover:text-white">
              Favorites
            </Link>
          </div>
        </div>
        <div className="px-16">
          <button 
            className="rounded-full p-2 hover:bg-gray-800"
            onClick={() => setIsModalOpen(true)}
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      <QuickbetSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  )
}

