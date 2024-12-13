const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface RecommendationsResponse {
  page: number;
  results: {
    id: number;
    title: string;
    poster_path: string;
  }[];
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export const movieService = {
  async getGenres(): Promise<Genre[]> {
    const response = await fetch(`${API_URL}/movies/genres`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await response.json();
    return data.genres || [];
  },

  async getRecommendations(movieId: number): Promise<RecommendationsResponse> {
    const response = await fetch(`${API_URL}/movies/${movieId}/recommendations`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie recommendations');
    }
    return response.json();
  },

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    const response = await fetch(`${API_URL}/movies?genre=${genreId}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies for genre ${genreId}`);
    }
    const data = await response.json();
    return { results: data.results || [], total_pages: data.total_pages || 1 };
  },

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const response = await fetch(`${API_URL}/movies?query=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return { results: data.results || [], total_pages: data.total_pages || 1 };
  },

  async getFavoriteMovies(token: string): Promise<Movie[]> {
    const response = await fetch(`${API_URL}/likes/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch favorite movies');
    }
    return response.json();
  },

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const response = await fetch(`${API_URL}/movies/popular?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return { results: data.results || [], total_pages: data.total_pages || 1 };
  },
};

