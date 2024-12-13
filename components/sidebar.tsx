'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Menu, X } from 'lucide-react'

interface Genre {
  id: number
  name: string
}

interface SidebarProps {
  onGenreSelect: (genreId: number | null) => void
  onSearch: (query: string) => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function Sidebar({ onGenreSelect, onSearch }: SidebarProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_URL}/movies/genres`)
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
      if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-4 left-4 z-50 bg-[#262626] p-2 rounded-md transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu className="text-white" size={24} />
      </button>
      <aside
        ref={sidebarRef}
        className={`fixed md:sticky top-0 left-0 z-[60] w-64 bg-[#262626] min-h-screen overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:flex md:flex-col`}
      >
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-between items-center p-4 md:hidden">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none transition-opacity duration-300 hover:opacity-80"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 flex-grow">
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
            <div className="h-1 bg-[#3A3A3A] my-4"></div>
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
                <ChevronDown
                  size={18}
                  className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="absolute z-20 w-full mt-2 bg-[#1C1C1C] max-h-60 overflow-y-auto custom-scrollbar">
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
    </>
  )
}

