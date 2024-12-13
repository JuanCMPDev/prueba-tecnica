"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { LogOut } from 'lucide-react'
import { useAuthStore } from "@/store/authStore"
import { useLikeStore } from "@/store/likeStore"
import { likeService } from "@/services/likeService"
import QuickbetSignupModal from "./quickbet-signup-modal"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAuthenticated, logout, token } = useAuthStore()
  const { setLikes } = useLikeStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      setIsModalOpen(false)
      if (token) {
        likeService.fetchLikes(token)
          .then(setLikes)
          .catch(error => console.error('Error fetching likes:', error))
      }
    }
  }, [isAuthenticated, token, setLikes])

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/?favorites=true')
  }

  const handlePopularClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/?popular=true')
  }

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true)
    }
  }

  const handleLogout = () => {
    logout()
    setLikes([])
    router.push('/')
  }

  return (
    <nav className="w-full bg-black px-4 py-3 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between md:justify-start">
          <div className="md:hidden w-10"></div>
          <div className="flex-grow flex justify-center md:justify-start items-center">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src={'/assets/Logo.png'} 
                width={120}
                height={40}
                className="h-10 w-auto"
                alt="logo.png"
              />
            </Link>
            <div className="hidden md:flex space-x-6 ml-8">
              <a href="#" onClick={handlePopularClick} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                Popular
              </a>
              {isAuthenticated && (
                <a href="#" onClick={handleFavoritesClick} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Favorites
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-auto w-auto focus:ring-2 focus:ring-[#F0B90B] focus:ring-offset-2 focus:ring-offset-black">
                    <Avatar className="h-10 w-10 border-2 border-[#F0B90B] transition-all duration-200 hover:border-opacity-80">
                      <AvatarFallback className="bg-[#F0B90B] text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 text-white border-gray-700">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-gray-700 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost"
                className="rounded-full p-0 h-auto w-auto focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black"
                onClick={handleOpenModal}
              >
                <Avatar className="h-10 w-10 transition-all duration-200 hover:opacity-80">
                  <AvatarFallback className="bg-gray-400 text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
          </div>
        </div>
      </div>
      <QuickbetSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  )
}

