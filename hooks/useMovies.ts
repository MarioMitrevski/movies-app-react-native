import { useCallback, useEffect, useRef, useState } from 'react';
import { Movie, movieService } from '../services/movieService';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const moviesRef = useRef<Movie[]>([]);

  const fetchMovies = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const newMovies = await movieService.getPopularMovies(pageNum);
      // Filter out any movies that already exist in our list using the ref
      const uniqueNewMovies = newMovies.filter(
        (newMovie: Movie) => !moviesRef.current.some(existingMovie => existingMovie.id === newMovie.id)
      );
      
      const updatedMovies = pageNum === 1 ? uniqueNewMovies : [...moviesRef.current, ...uniqueNewMovies];
      moviesRef.current = updatedMovies;
      setMovies(updatedMovies);
      setHasMore(uniqueNewMovies.length > 0);
    } catch (e) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error fetching movies:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  return { movies, loading, error, loadMore, hasMore };
} 