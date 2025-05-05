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
      const data = await movieService.getPopularMovies(pageNum);
      // Filter out any movies that already exist in our list using the ref
      const newMovies = data.results.filter(
        newMovie => !moviesRef.current.some(existingMovie => existingMovie.id === newMovie.id)
      );
      
      const updatedMovies = pageNum === 1 ? newMovies : [...moviesRef.current, ...newMovies];
      moviesRef.current = updatedMovies;
      setMovies(updatedMovies);
      setHasMore(data.page < data.total_pages);
    } catch (e) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error fetching movies:', e);
    } finally {
      setLoading(false);
    }
  }, []); // Remove movies from dependencies

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