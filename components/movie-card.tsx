import Image from "next/image"
import { Heart } from 'lucide-react'
import { CircularProgress } from './circular-progress'
import { useState } from 'react'

interface MovieCardProps {
  image: string
  date: string
  rating: number
  title: string
}

export function MovieCard({ image, date, rating, title }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-lg bg-[#1E1E1E] w-full aspect-[200/335] flex flex-col">
      <div className="relative flex-grow">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2 flex flex-col justify-between">
        <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-400">{date}</p>
        <div className="flex justify-center gap-x-8 items-center pt-2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Rating</span>
            <CircularProgress 
              percentage={rating} 
              size={36} 
              strokeWidth={3}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Favorite</span>
            <button 
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={() => setIsFavorite(prev => !prev)}
            >
              <Heart className={`h-8 w-8 ${isFavorite ? 'fill-current text-white' : 'stroke-current'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

