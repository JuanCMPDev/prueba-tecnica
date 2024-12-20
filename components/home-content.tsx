'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Hero } from "@/components/hero";
import { MovieSection } from "@/components/movie-section";
import { Sidebar } from "@/components/sidebar";
import { useAuthStore } from "@/store/authStore";
import { useLikeStore } from "@/store/likeStore";
import { Movie, movieService } from "@/services/movieService";
import { likeService } from "@/services/likeService";

export const HomeContent = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { token, isAuthenticated } = useAuthStore();
  const { setLikes } = useLikeStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const favorites = searchParams.get('favorites');
    const popular = searchParams.get('popular');
    setShowFavorites(favorites === 'true');
    setShowPopular(popular === 'true');
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated && token) {
          const fetchedLikes = await likeService.fetchLikes(token);
          setLikes(fetchedLikes);

          if (showFavorites) {
            const favorites = await movieService.getFavoriteMovies(token);
            setFavoriteMovies(favorites);
          }
        }

        if (showPopular) {
          const { results, total_pages } = await movieService.getPopularMovies(currentPage);
          setPopularMovies(results);
          setTotalPages(total_pages);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, token, showFavorites, showPopular, currentPage, setLikes]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenreId(null);
    setShowFavorites(false);
    setShowPopular(false);
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenreId(genreId);
    setShowFavorites(false);
    setShowPopular(false);
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#454545]">
      <Hero id={1011985} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onGenreSelect={handleGenreSelect}
          onSearch={handleSearch}
        />
        <div className="flex-1 overflow-y-auto">
          <MovieSection
            selectedGenreId={selectedGenreId}
            searchQuery={searchQuery}
            showFavorites={showFavorites}
            showPopular={showPopular}
            favoriteMovies={favoriteMovies}
            popularMovies={popularMovies}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
