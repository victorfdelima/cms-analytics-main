import { useEffect, useState } from 'react';

import api from '@/services/api';

export const useFetch = <T,>(url: string, limit = 12) => {
  const [data, setData] = useState<T>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(url, {
          params: {
            limit,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, limit]);

  return { data, error, isLoading };
};
