'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Heart, TrendingUp } from 'lucide-react'

interface Genre {
  id: number
  name: string
}

interface SidebarProps {
  onGenreSelect: (genreId: number | null) => void
  onSearch: (query: string) => void
  onFavoritesClick: () => void
  onPopularClick: () => void
  isAuthenticated: boolean
  showFavorites: boolean
  showPopular: boolean
}

export function Sidebar({ 
  onGenreSelect, 
  onSearch, 
  onFavoritesClick, 
  onPopularClick,
  isAuthenticated, 
  showFavorites,
  showPopular
}: SidebarProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/genres`)
        if (!response.ok) {
          throw new Error('Failed to fetch genres')
        }
        const data = await response.json()
        setGenres(data.genres || [])
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    fetchGenres()
  }, [])

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

  const handleGenreSelect = (genre: Genre | null) => {
    setSelectedGenre(genre)
    setIsOpen(false)
    onGenreSelect(genre ? genre.id : null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <aside className="w-64 bg-[#262626] h-screen overflow-y-auto flex-shrink-0 relative z-10">
      <div className="sticky top-0 z-20 bg-[#262626]">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Search</h2>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C1C1C] px-3 py-2 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F6F6F6] appearance-none"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-transparent"
            >
              <Search className="text-gray-400" size={18} />
            </button>
          </form>
          <div className="h-1 bg-[#3A3A3A] mt-4"></div>
        </div>
        {isAuthenticated && (
          <div className="p-4">
            <button
              onClick={onFavoritesClick}
              className={`w-full px-3 py-2 text-sm text-white flex items-center justify-between focus:outline-none ${
                showFavorites ? 'bg-[#F6F6F6] text-[#1C1C1C]' : 'bg-[#1C1C1C] hover:bg-[#3A3A3A]'
              }`}
            >
              <span>Favorites</span>
              <Heart size={18} className={showFavorites ? 'text-[#1C1C1C]' : ''} />
            </button>
            <div className="h-1 bg-[#3A3A3A] mt-4"></div>
          </div>
        )}
        <div className="p-4">
          <button
            onClick={onPopularClick}
            className={`w-full px-3 py-2 text-sm text-white flex items-center justify-between focus:outline-none ${
              showPopular ? 'bg-[#F6F6F6] text-[#1C1C1C]' : 'bg-[#1C1C1C] hover:bg-[#3A3A3A]'
            }`}
          >
            <span>Popular</span>
            <TrendingUp size={18} className={showPopular ? 'text-[#1C1C1C]' : ''} />
          </button>
          <div className="h-1 bg-[#3A3A3A] mt-4"></div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Genres</h2>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-[#1C1C1C] px-3 py-2 text-sm text-white flex justify-between items-center focus:outline-none"
            >
              {selectedGenre ? (
                selectedGenre.name
              ) : (
                <div className="w-16 h-0.5 bg-gray-400"></div>
              )}
              <ChevronDown size={18} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="absolute z-30 w-full mt-2 bg-[#1C1C1C] max-h-60 overflow-y-auto custom-scrollbar">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedGenre?.id === genre.id
                        ? 'bg-[#F6F6F6] text-[#1C1C1C]'
                        : 'text-white hover:bg-[#3A3A3A]'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

