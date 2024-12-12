"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Eye, EyeOff, Ticket } from 'lucide-react'

interface QuickbetSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickbetSignupModal({ isOpen, onClose }: QuickbetSignupModalProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showEmail, setShowEmail] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-[1200px] w-[90vw] h-[80vh] border-none shadow-none [&>button]:hidden bg-fff/10 backdrop-filter backdrop-blur-lg">
        <div className="flex h-full">
          {/* Left side - dark backdrop */}
          <div className="relative w-3/5 hidden md:flex flex-col p-16">
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
              <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center">
                {isSignUp ? (
                  <Button 
                    className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 w-full max-w-md flex items-center justify-center space-x-2 mb-24 h-12 text-base"
                  >
                    <span>Register with your email</span>
                    <Mail className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <div className="w-full max-w-md space-y-8 mb-24">
                    <p className="text-white text-sm text-center mb-6">We love having you back</p>
                    <div className="relative">
                      <Input 
                        type={showEmail ? "text" : "email"}
                        placeholder="Email" 
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
                      className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 w-full flex items-center justify-center space-x-2 h-10 text-base"
                    >
                      <span>Continue</span>
                      <Ticket className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
                <p className="text-white text-sm text-center mt-4">
                  For any questions, reach out to support@Quickbetmovies.com
                </p>
              </div>
            </div>
          </div>
          {/* Right side - signup content */}
          <div className="w-full md:w-2/5 bg-zinc-900/90 text-white flex flex-col h-full relative">
            <div className="absolute top-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-center my-6">
                Welcome to Quickbet Movies!
              </h2>
              <p className="text-xl text-center">
                {isSignUp 
                  ? "🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"
                  : "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <Image
                src={isSignUp ? "/assets/modals/02.png" : "/assets/modals/01.png"}
                alt="3D character"
                width={547}
                height={546}
                className="w-full h-auto object-contain object-bottom"
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
      className={`px-6 py-2.5 text-base font-medium rounded-md relative z-10 text-white`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

