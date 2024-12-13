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
      } catch (err) {
        setError('Error fetching movie data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [id, token])

  const handleLike = async () => {
    if (!movie || !token) return
    try {
      if (isLiked(movie.id)) {
        await likeService.removeLike(movie.id, token)
        removeLike(movie.id)
      } else {
        await likeService.addLike(movie.id, token)
        addLike(movie.id)
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
      <div className="relative h-[60vh] w-full bg-black flex items-center justify-center">
        <div className="text-red-500">{error || 'Failed to load movie'}</div>
      </div>
    )
  }

  return (
    <div className="relative h-[60vh] w-full">
      <Image
        src={movie.banner}
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 py-12">
        <div className="px-20">
          <div className="flex items-end justify-between">
            <div className="max-w-4xl space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-white font-ibm-plex-sans">{movie.title}</h1>
              <p className="text-lg text-gray-200 font-bold font-ibm-plex-sans">{movie.overview}</p>
            </div>
            <div className="flex items-center space-x-10">
              {isAuthenticated && (
                <button 
                  className="text-white hover:text-white/80 transition-colors"
                  onClick={handleLike}
                >
                  <Heart 
                    className={`h-8 w-8 ${isLiked(movie.id) ? 'fill-current' : 'stroke-current'}`} 
                  />
                </button>
              )}
              <CircularProgress 
                percentage={Math.round(movie.vote_average * 10)} 
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

function HeroSkeleton() {
  return (
    <div className="relative h-[60vh] w-full bg-gray-900 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-8 py-12">
        <div className="px-20">
          <div className="flex items-end justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="h-12 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="flex items-center space-x-10">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

