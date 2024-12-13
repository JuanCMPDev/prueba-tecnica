'use client'

import { Heart, ChevronLeft, Play } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { CircularProgress } from "@/components/circular-progress"
import { MovieCategory } from "@/components/simple-movie-category"
import { Loader } from "@/components/loader"
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useLikeStore } from '@/store/likeStore'
import { likeService } from '@/services/likeService'
import { movieService } from '@/services/movieService'

interface Movie {
  id: number
  title: string
  release_date: string
  runtime: number
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  genres: { id: number; name: string }[]
}

interface RecommendedMovie {
  id: number
  title: string
  poster_path: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLiking, setIsLiking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const { token, isAuthenticated } = useAuthStore()
  const { isLiked, addLike, removeLike } = useLikeStore()

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const movieResponse = await fetch(`${API_URL}/movies/${params.id}`)
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie data')
        }
        const movieData = await movieResponse.json()
        setMovie(movieData)

        const recommendationsData = await movieService.getRecommendations(movieData.id)
        setRecommendations(recommendationsData.results || [])
      } catch (err) {
        console.error('Error fetching movie data:', err)
        setError('Failed to fetch movie data: ' + (err instanceof Error ? err.message : String(err)))
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieData()
    window.scrollTo(0, 0)
  }, [params.id])

  const handleLike = async () => {
    if (!movie || !token || isLiking) return
    setIsLiking(true)
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
    } finally {
      setIsLiking(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (error || !movie) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">{error || 'Movie not found'}</div>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 h-[80vh]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Movie backdrop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-transparent" />
        </div>

        <div className="relative pt-4">
          <div className="p-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-[350px,1fr] gap-8 items-start">
              <div className="space-y-4">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Movie poster"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6 lg:ml-8">
                <div className="w-fit flex flex-col">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </h1>
                  <div className="flex justify-between text-gray-400 text-base">
                    <p>{formatDate(movie.release_date)}</p>
                    <p className='pr-2'>{formatRuntime(movie.runtime)}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Overview:</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movie.overview}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 mt-8">
                    <CircularProgress percentage={Math.round(movie.vote_average * 10)} size={120} strokeWidth={6} />
                    <div className="text-lg">
                      <p className="text-gray-400">Users</p>
                      <p className="font-semibold">Score</p>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <button
                      className={`text-white hover:text-white/80 transition-colors ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleLike}
                      disabled={isLiking}
                    >
                      <Heart
                        className={`h-8 w-8 ${
                          isLiked(movie.id) ? "fill-current text-white" : "text-gray-400"
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid lg:grid-cols-[350px,1fr] gap-8 items-start">
              <div>
                <Link
                  href="#"
                  className="flex items-center justify-center w-full py-3 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black text-center rounded-md transition duration-300 ease-in-out"
                >
                  <span className="mr-2">Official Trailer</span>
                  <Play className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6 mx-16 items-center justify-center">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 mt-1 text-sm border border-[#F1CB51] text-[#F1CB51] rounded-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#3A3A3A] mt-12">
          <div className="container mx-auto px-4 py-12">
            <MovieCategory 
              title="Recommendations" 
              movies={recommendations.map(movie => ({
                id: movie.id,
                title: movie.title,
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

