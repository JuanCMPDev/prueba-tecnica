import { MovieCardSkeleton } from './movie-card-skeleton'

export function MovieCategorySkeleton() {
  return (
    <div className="mb-8">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

