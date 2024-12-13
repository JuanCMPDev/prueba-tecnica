'use client'

import Image from "next/image"
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CircularProgress } from './circular-progress'
import { useAuthStore } from '@/store/authStore'
import { useLikeStore } from '@/store/likeStore'
import { likeService } from '@/services/likeService'

interface Movie {
  id: number
  title: string
  overview: string
  banner: string
  vote_average: number
}

interface HeroProps {
  id: number
}

export function Hero({ id }: HeroProps) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()
  const { isLiked, addLike, removeLike } = useLikeStore()
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }
        const data = await response.json()
        setMovie(data)
        setLiked(isLiked(data.id));
      } catch (err) {
        setError('Error fetching movie data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [id, token, isLiked])

  const handleLike = async () => {
    if (!movie || !token) return
    try {
      if (isLiked(movie.id)) {
        await likeService.removeLike(movie.id, token)
        removeLike(movie.id)
        setLiked(false);
      } else {
        await likeService.addLike(movie.id, token)
        addLike(movie.id)
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to update like:', error)
    }
  }

  if (isLoading) {
    return <HeroSkeleton />
  }

  if (error || !movie) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full bg-black flex items-center justify-center">
        <div className="text-red-500">{error || 'Failed to load movie'}</div>
      </div>
    )
  }

  return (
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
      <Image
        src={movie.banner}
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
        <div className="px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between">
            <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-2 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white font-ibm-plex-sans">{movie.title}</h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 font-bold font-ibm-plex-sans line-clamp-3 sm:line-clamp-none">{movie.overview}</p>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-10 mt-4 sm:mt-0">
              {isAuthenticated && (
                <button 
                  className="text-white hover:text-white/80 transition-colors"
                  onClick={handleLike}
                >
                  <Heart 
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${liked ? 'fill-current text-white' : 'stroke-current text-gray-400'}`} 
                  />
                </button>
              )}
              <CircularProgress 
                percentage={Math.round(movie.vote_average * 10)} 
                size={48} 
                strokeWidth={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full bg-gray-900 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
        <div className="px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between">
            <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-2 sm:space-y-4">
              <div className="h-8 sm:h-10 md:h-12 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-full"></div>
              <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-10 mt-4 sm:mt-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-700 rounded-full"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

