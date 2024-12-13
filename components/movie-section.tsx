'use client'

import { useState, useEffect } from 'react'
import { MovieCategory } from "@/components/movie-category"
import { PaginatedMovieGrid } from "@/components/paginated-movie-grid"
import { MovieCategorySkeleton } from "@/components/movie-category-skeleton"
import styles from './movie-section.module.css'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  genre_ids?: number[]
}

interface Genre {
  id: number
  name: string
}

interface CategoryMovies {
  [key: number]: Movie[]
}

interface MovieSectionProps {
  selectedGenreId: number | null
  searchQuery: string
  showFavorites: boolean
  showPopular: boolean
  favoriteMovies: Movie[]
  popularMovies: Movie[]
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function MovieSection({ 
  selectedGenreId, 
  searchQuery, 
  showFavorites, 
  showPopular, 
  favoriteMovies, 
  popularMovies,
  totalPages,
  currentPage,
  onPageChange
}: MovieSectionProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [categoryMovies, setCategoryMovies] = useState<CategoryMovies>({})
  const [selectedGenreMovies, setSelectedGenreMovies] = useState<Movie[]>([])
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [genreTotalPages, setGenreTotalPages] = useState(1)

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_URL}/movies/genres`)
      if (!response.ok) {
        throw new Error('Failed to fetch genres')
      }
      const data = await response.json()
      return data.genres || []
    } catch (error) {
      console.error('Error fetching genres:', error)
      return []
    }
  }

  const fetchMoviesForGenre = async (genreId: number, page: number = 1) => {
    try {
      const response = await fetch(`${API_URL}/movies?genre=${genreId}&page=${page}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch movies for genre ${genreId}`)
      }
      const data = await response.json()
      return { results: data.results || [], totalPages: data.total_pages || 1 }
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error)
      return { results: [], totalPages: 1 }
    }
  }

  const fetchSearchResults = async (query: string, page:number = 1) => {
    try {
      const response = await fetch(`${API_URL}/movies?query=${encodeURIComponent(query)}&page=${page}`)
      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }
      const data = await response.json()
      return { results: data.results || [], totalPages: data.total_pages || 1 }
    } catch (error) {
      console.error('Error fetching search results:', error)
      return { results: [], totalPages: 1 }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const fetchedGenres = await fetchGenres()
      setGenres(fetchedGenres)

      if (showFavorites || showPopular) {
      } else if (searchQuery) {
        const { results, totalPages: searchTotalPages } = await fetchSearchResults(searchQuery, currentPage)
        setSearchResults(results)
        setGenreTotalPages(searchTotalPages)
      } else if (selectedGenreId) {
        const { results, totalPages: genreTotalPages } = await fetchMoviesForGenre(selectedGenreId, currentPage)
        setSelectedGenreMovies(results)
        setGenreTotalPages(genreTotalPages)
      } else {
        const moviesPromises = fetchedGenres.map((genre: Genre) => fetchMoviesForGenre(genre.id))
        const moviesResults = await Promise.all(moviesPromises)
        const newCategoryMovies: CategoryMovies = {}
        fetchedGenres.forEach((genre: Genre, index: number) => {
          newCategoryMovies[genre.id] = moviesResults[index].results
        })
        setCategoryMovies(newCategoryMovies)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [selectedGenreId, searchQuery, currentPage, showFavorites, showPopular])

  if (isLoading) {
    return (
      <div className={styles.movieSection}>
        <div className={styles.movieSectionContent}>
          {[...Array(3)].map((_, index) => (
            <MovieCategorySkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (showFavorites) {
    return (
      <div className={styles.movieSection}>
        <div className={styles.movieSectionContent}>
          <h2 className="text-2xl font-bold text-white mb-4">Your Favorite Movies</h2>
          {favoriteMovies.length > 0 ? (
            <PaginatedMovieGrid 
              movies={favoriteMovies} 
              totalPages={1} 
              currentPage={1}
              onPageChange={() => {}}
            />
          ) : (
            <div className="text-center text-white mt-8">You haven&apos;t added any movies to your favorites yet.</div>
          )}
        </div>
      </div>
    )
  }

  if (showPopular) {
    return (
      <div className={styles.movieSection}>
        <div className={styles.movieSectionContent}>
          <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
          {popularMovies.length > 0 ? (
            <PaginatedMovieGrid 
              movies={popularMovies} 
              totalPages={totalPages} 
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ) : (
            <div className="text-center text-white mt-8">No popular movies available at the moment.</div>
          )}
        </div>
      </div>
    )
  }

  if (searchQuery) {
    return (
      <div className={styles.movieSection}>
        <div className={styles.movieSectionContent}>
          <h2 className="text-2xl font-bold text-white mb-4">Search Results for &quot;{searchQuery}&quot;</h2>
          {searchResults.length > 0 ? (
            <PaginatedMovieGrid 
              movies={searchResults} 
              totalPages={genreTotalPages} 
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ) : (
            <div className="text-center text-white mt-8">No movies found for your search.</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.movieSection}>
      <div className={styles.movieSectionContent}>
        {selectedGenreId ? (
          selectedGenreMovies.length > 0 ? (
            <PaginatedMovieGrid 
              movies={selectedGenreMovies} 
              totalPages={genreTotalPages} 
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ) : (
            <div className="text-center text-white mt-8">No movies found for this genre.</div>
          )
        ) : (
          genres.map((genre) => (
            <MovieCategory 
              key={genre.id} 
              title={genre.name} 
              movies={categoryMovies[genre.id] || []}
            />
          ))
        )}
      </div>
    </div>
  )
}

