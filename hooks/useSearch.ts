import { movieService } from '@/services/movieService';
import { useEffect, useState } from 'react';

type SearchType = 'movie' | 'tv';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<SearchType>('movie');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query.trim()) {
        setLoading(true);
        setError(null);
        try {
          const data = type === 'movie' 
            ? await movieService.getPopularMovies()
            : await movieService.getPopularTVShows();
          setResults(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await movieService.search(type, query);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimer);
  }, [query, type]);

  return {
    query,
    setQuery,
    type,
    setType,
    results,
    loading,
    error,
  };
} 