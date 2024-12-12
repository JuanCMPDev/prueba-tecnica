'use client'

import Image from "next/image"
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { CircularProgress } from './circular-progress'

interface HeroProps {
  title: string
  description: string
  image: string
  rating: number
}

export function Hero({ title, description, image, rating }: HeroProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="relative h-[60vh] w-full">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 py-12">
        <div className="px-20">
          <div className="flex items-end justify-between">
            <div className="max-w-4xl space-y-4">
              <h1 className="text-5xl font-bold leading-tight font-ibm-plex-sans">{title}</h1>
              <p className="text-lg text-gray-200 font-bold font-ibm-plex-sans">{description}</p>
            </div>
            <div className="flex items-center space-x-10">
              <button 
                className="text-white hover:text-white/80 transition-colors"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  className={`h-8 w-8 ${isFavorite ? 'fill-current' : 'stroke-current'}`} 
                />
              </button>
              <CircularProgress 
                percentage={rating} 
                size={64} 
                strokeWidth={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

