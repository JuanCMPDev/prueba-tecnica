'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'

export function Sidebar() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama",
    "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
    "Romance", "Sci-Fi", "Thriller", "War", "Western", "Biography", "Sport"
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <aside className="w-64 bg-[#262626] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-[#262626]">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Search</h2>
          <div className="relative">
            <input
              type="search"
              placeholder="Keywords"
              className="w-full bg-[#1C1C1C] px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F6F6F6]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="h-1 bg-[#3A3A3A] mt-0"></div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Genres</h2>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-[#1C1C1C] px-3 py-2 text-sm text-white flex justify-between items-center focus:outline-none"
            >
              {selectedGenre || <div className="w-16 h-0.5 bg-gray-400"></div>}
              <ChevronDown size={18} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="absolute z-20 w-full mt-2 bg-[#1C1C1C] max-h-60 overflow-y-auto custom-scrollbar">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => {
                      setSelectedGenre(genre)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedGenre === genre
                        ? 'bg-[#F6F6F6] text-[#1C1C1C]'
                        : 'text-white hover:bg-[#3A3A3A]'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4">
      </div>
    </aside>
  )
}

