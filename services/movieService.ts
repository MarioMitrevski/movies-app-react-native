import api from '../config/api';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  backdrop_path: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export interface TVShowDetails extends TVShow {
  backdrop_path: string;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  genres: { id: number; name: string }[];
}

export interface SearchResult {
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
}

export const movieService = {
  async getPopularMovies(page = 1): Promise<Movie[]> {
    const response = await api.get<{ results: Movie[] }>(`/movie/popular`, {
      params: {
        page,
        language: 'en-US',
      },
    });
    return response.data.results || [];
  },

  async getPopularTVShows(page = 1): Promise<TVShow[]> {
    const response = await api.get<{ results: TVShow[] }>(`/tv/popular`, {
      params: {
        page,
        language: 'en-US',
      },
    });
    return response.data.results || [];
  },

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  },

  async getTVShowDetails(tvId: number): Promise<TVShowDetails> {
    const response = await api.get<TVShowDetails>(`/tv/${tvId}`, {
      params: {
        language: 'en-US',
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  },

  async search(type: 'movie' | 'tv', query: string, page = 1) {
    const response = await api.get(`/search/${type}`, {
      params: {
        query,
        page,
        language: 'en-US',
      },
    });
    return response.data.results || [];
  },
}; 