import api from '../config/api';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  backdrop_path: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const movieService = {
  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
      params: { language: 'en-US' },
    });
    return response.data;
  },

  async searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
    const response = await api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
}; 