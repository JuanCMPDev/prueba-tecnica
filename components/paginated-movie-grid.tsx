'use client'

import ReactPaginate from 'react-paginate'
import { MovieCard } from './movie-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

interface PaginatedMovieGridProps {
  movies: Movie[]
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginatedMovieGrid({ movies, totalPages, currentPage, onPageChange }: PaginatedMovieGridProps) {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-400 mt-8">No movies available.</div>
  }

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1
    onPageChange(newPage)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            date={movie.release_date}
            rating={Math.round(movie.vote_average * 10)}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel={<ChevronLeft className="w-5 h-5" />}
        nextLabel={<ChevronRight className="w-5 h-5" />}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={'flex justify-center items-center space-x-2 mt-12'}
        pageClassName={'bg-[#262626] text-white rounded-md transition-colors duration-200'}
        pageLinkClassName={'px-3 py-2 rounded-md hover:bg-[#3A3A3A] inline-block'}
        activeClassName={'bg-[#F0B90B] text-black'}
        activeLinkClassName={'px-3 py-2 rounded-md inline-block'}
        previousClassName={'bg-[#262626] text-white rounded-md transition-colors duration-200'}
        previousLinkClassName={'px-2 py-2 rounded-md hover:bg-[#3A3A3A] inline-block'}
        nextClassName={'bg-[#262626] text-white rounded-md transition-colors duration-200'}
        nextLinkClassName={'px-2 py-2 rounded-md hover:bg-[#3A3A3A] inline-block'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        breakClassName={'bg-[#262626] text-white rounded-md transition-colors duration-200'}
        breakLinkClassName={'px-3 py-2 rounded-md hover:bg-[#3A3A3A] inline-block'}
      />
    </div>
  )
}

