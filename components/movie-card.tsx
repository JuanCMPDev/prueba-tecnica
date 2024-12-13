import Image from "next/image"
import { Heart } from 'lucide-react'
import { CircularProgress } from './circular-progress'
import { useAuthStore } from '@/store/authStore'
import { useLikeStore } from '@/store/likeStore'
import { likeService } from '@/services/likeService'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface MovieCardProps {
  id: number
  image: string
  date: string
  rating: number
  title: string
}

export function MovieCard({ id, image, date, rating, title }: MovieCardProps) {
  const router = useRouter()
  const { token, isAuthenticated } = useAuthStore()
  const { isLiked, addLike, removeLike } = useLikeStore()
  const [isLiking, setIsLiking] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartTime = useRef<number | null>(null)
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!token || isLiking) return
    setIsLiking(true)
    try {
      if (isLiked(id)) {
        await likeService.removeLike(id, token)
        removeLike(id)
      } else {
        await likeService.addLike(id, token)
        addLike(id)
      }
    } catch (error) {
      console.error('Failed to update like:', error)
      if (error instanceof Error && (error as { response?: { status?: number } }).response?.status === 409) {
        if (isLiked(id)) {
          removeLike(id)
        } else {
          addLike(id)
        }
      }
    } finally {
      setIsLiking(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartTime.current = Date.now()
    dragStartPosition.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartTime.current && dragStartPosition.current) {
      const dragEndTime = Date.now()
      const dragEndPosition = { x: e.clientX, y: e.clientY }
    
      const dragDuration = dragEndTime - dragStartTime.current
      const dragDistance = Math.sqrt(
        Math.pow(dragEndPosition.x - dragStartPosition.current.x, 2) +
        Math.pow(dragEndPosition.y - dragStartPosition.current.y, 2)
      )

      if (dragDuration < 200 && dragDistance < 5) {
        e.preventDefault()
        router.push(`/movies/${id}`)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartPosition.current) {
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - dragStartPosition.current.x, 2) +
        Math.pow(e.clientY - dragStartPosition.current.y, 2)
      )
      setIsDragging(dragDistance > 5)
    }
  }

  const handleNavigation = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.preventDefault()
      router.push(`/movies/${id}`)
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleNavigation}
      className={`block ${isDragging ? 'pointer-events-none' : ''}`}
    >
      <div className="group relative overflow-hidden rounded-lg bg-[#1E1E1E] w-full aspect-[200/335] flex flex-col">
        <div className="relative flex-grow">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 space-y-2 flex flex-col justify-between">
          <h3 className="text-sm font-semibold line-clamp-1 text-white">{title}</h3>
          <p className="text-xs text-gray-400">{date}</p>
          <div className="flex justify-center items-center pt-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-1">Rating</span>
              <CircularProgress 
                percentage={rating} 
                size={36} 
                strokeWidth={3}
              />
            </div>
            {isAuthenticated && (
              <div className="flex flex-col items-center ml-8">
                <span className="text-xs text-gray-400 mb-1">Favorite</span>
                <button 
                  className={`text-gray-400 hover:text-white transition-colors focus:outline-none ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label={isLiked(id) ? "Remove from favorites" : "Add to favorites"}
                  onMouseDown={handleLike}
                  disabled={isLiking}
                >
                  <Heart className={`h-8 w-8 ${isLiked(id) ? 'fill-current text-white' : 'stroke-current'}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

