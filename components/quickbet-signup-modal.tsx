"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Eye, EyeOff, Ticket } from 'lucide-react'
import { useAuthStore } from "@/store/authStore"

interface QuickbetSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function QuickbetSignupModal({ isOpen, onClose }: QuickbetSignupModalProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      onClose()
    }
  }, [isAuthenticated, onClose])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        onClose();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        onClose();
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-[1200px] w-[95vw] h-[95vh] md:h-[80vh] md:w-[90vw] border-none shadow-none [&>button]:hidden bg-fff/10 backdrop-filter backdrop-blur-lg">
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:w-3/5 flex flex-col p-4 md:p-16 overflow-y-auto">
            <div className="absolute top-6 left-6 flex items-center text-white">
              <Button
                variant="outline"
                onClick={onClose}
                className="mr-2 rounded-full w-6 h-6 flex items-center justify-center border border-white hover:bg-white/20 bg-transparent p-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span className="sr-only">Back</span>
              </Button>
              <span className="text-lg">Back</span>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="flex justify-center mt-8">
                <div className="relative bg-[#262626] rounded-lg p-0.5 flex">
                  <motion.div
                    className="absolute top-0.5 bottom-0.5 rounded-md bg-[#F0B90B]"
                    initial={false}
                    animate={{
                      x: isSignUp ? 0 : "100%",
                      width: "50%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <ToggleButton active={isSignUp} onClick={() => setIsSignUp(true)}>
                    Sign Up
                  </ToggleButton>
                  <ToggleButton active={!isSignUp} onClick={() => setIsSignUp(false)}>
                    Login
                  </ToggleButton>
                </div>
              </div>
              <div className="mt-8 md:mt-0 md:absolute md:bottom-32 left-0 right-0 flex flex-col items-center px-4 md:px-0">
                {isSignUp ? (
                  <form onSubmit={handleSignup} className="w-full max-w-md space-y-3 md:space-y-4 mb-4 md:mb-24">
                    <p className="text-white text-sm text-center mb-6">Join Quickbet Movies today!</p>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="relative">
                      <Input 
                        type={showEmail ? "text" : "email"}
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 pr-10 bg-[#F6F6F6] border-gray-300 text-black placeholder-gray-500 h-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowEmail(!showEmail)}
                      >
                        {showEmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 pr-10 bg-[#F6F6F6] border-gray-300 text-black placeholder-gray-500 h-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button 
                      type="submit"
                      className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 w-full flex items-center justify-center space-x-2 h-10 text-base"
                    >
                      <span>Sign Up</span>
                      <Mail className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="w-full max-w-md space-y-3 md:space-y-4 mb-4 md:mb-24">
                    <p className="text-white text-sm text-center mb-6">We love having you back</p>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="relative">
                      <Input 
                        type={showEmail ? "text" : "email"}
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 pr-10 bg-[#F6F6F6] border-gray-300 text-black placeholder-gray-500 h-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowEmail(!showEmail)}
                      >
                        {showEmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 pr-10 bg-[#F6F6F6] border-gray-300 text-black placeholder-gray-500 h-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button 
                      type="submit"
                      className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 w-full flex items-center justify-center space-x-2 h-10 text-base"
                    >
                      <span>Continue</span>
                      <Ticket className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                )}
                <p className="text-white text-xs md:text-sm text-center mt-2 md:mt-4">
                  For any questions, reach out to support@Quickbetmovies.com
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 bg-zinc-900/90 text-white flex flex-col h-1/3 md:h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 p-4 pb-16 md:pb-8 md:p-8 z-10 bg-gradient-to-b from-zinc-900/90 to-transparent">
              <h2 className="text-xl md:text-4xl font-bold text-center my-2 md:my-6">
                Welcome to Quickbet Movies!
              </h2>
              <p className="text-sm md:text-xl text-center">
                {isSignUp 
                  ? "🎬 Ready to unlock cinematic delights? Sign up now!"
                  : "🍿 Ready for unlimited entertainment? Login now!"}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2/3 md:h-auto">
              <Image
                src={isSignUp ? "/assets/modals/02.png" : "/assets/modals/01.png"}
                alt="3D character"
                width={547}
                height={546}
                className="w-full h-full object-contain object-bottom md:object-contain md:h-auto"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ToggleButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function ToggleButton({ onClick, children }: ToggleButtonProps) {
  return (
    <motion.button
      className={`px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium rounded-md relative z-10 text-white`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

