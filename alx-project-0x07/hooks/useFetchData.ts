import { useState, useCallback } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

interface UseFetchDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string, options?: FetchOptions) => Promise<T | null>;
}

const useFetchData = <T>(): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string, options: FetchOptions = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Fetch error:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetchData;
