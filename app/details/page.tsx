'use client'

import { Heart, ChevronLeft, Play } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { CircularProgress } from "@/components/circular-progress"
import { MovieCategory } from "@/components/simple-movie-category"
import { useState } from "react"

interface Tag {
  id: string
  name: string
}

const recommendedMovies = [
  {
    title: "Top Gun",
    image: "/assets/movies/top-gun.png",
  },
  {
    title: "Days of Thunder",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Behind Enemy Lines",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Black Hawk Down",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Enemy at the Gates",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "The Aviator",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Mission: Impossible",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Jerry Maguire",
    image: "/placeholder.svg?height=400&width=300",
  }
]

const tags: Tag[] = [
  { id: "1", name: "Aviation" },
  { id: "2", name: "Fighter Jets" },
  { id: "3", name: "Military" },
  { id: "4", name: "Action" },
  { id: "5", name: "Sequel" },
  { id: "6", name: "Friendship" },
  { id: "7", name: "Legacy" },
  { id: "8", name: "Mentorship" },
  { id: "9", name: "Aerial Combat" },
  { id: "10", name: "Naval Aviation" }
]

export default function MovieDetails() {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 h-[80vh]">
          <Image
            src="/assets/movies/top-gun-banner.png"
            alt="Movie backdrop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative pt-4">
          {/* Back Button */}
          <div className="p-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </div>

          {/* Movie Details */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-[350px,1fr] gap-8 items-start">
              {/* Movie Poster */}
              <div className="space-y-4">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/assets/movies/top-gun.png"
                    alt="Movie poster"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="space-y-6 ml-8">
                <div className="w-fit flex flex-col">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2 whitespace-nowrap">
                    Top Gun Maverick (2022)
                  </h1>
                  <div className="flex justify-between text-gray-400 text-sm md:text-base">
                    <p>January 17, 2022</p>
                    <p className='pr-2'>2h 10min</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Overview:</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    &quot;Top Gun: Maverick&quot; is a high-octane action drama that serves as a sequel to the iconic 1986 film &quot;Top Gun.&quot; Directed by Joseph Kosinski, the movie follows Captain Pete &quot;Maverick&quot; Mitchell, played by Tom Cruise, who has spent over thirty years as a naval aviator, dodging promotions that would ground him. When he is assigned to train a new generation of Top Gun graduates for a specialized mission, he confronts his past and the ghosts of his fallen friends.
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 mt-8">
                    <CircularProgress percentage={95} size={120} strokeWidth={6} />
                    <div className="text-lg">
                      <p className="text-gray-400">Users</p>
                      <p className="font-semibold">Score</p>
                    </div>
                  </div>
                  <Heart
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 cursor-pointer ${
                      isFavorite ? "fill-current text-white" : "text-gray-400"
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  />
                </div>
              </div>
            </div>

            {/* Tags Section and Trailer Button */}
            <div className="mt-4 grid lg:grid-cols-[350px,1fr] gap-8 items-start">
              <div>
                <Link
                  href="#" // Replace with actual trailer link
                  className="flex items-center justify-center w-full py-3 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black text-center rounded-md transition duration-300 ease-in-out"
                >
                  <span className="mr-2">Official Trailer</span>
                  <Play className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6 mx-16 items-center justify-center">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 mt-1 text-sm border border-[#F1CB51] text-[#F1CB51] rounded-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#3A3A3A] mt-12">
          <div className="container mx-auto px-4 py-12">
            <MovieCategory title="Recommendations" movies={recommendedMovies} />
          </div>
        </div>
      </div>
    </div>
  )
}

