import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import api from '../api';

interface GetInstructorsParams {
  page: number;
  size: number;
}

export const getInstructors = async (
  { page, size }: GetInstructorsParams = {
    page: 0,
    size: 10,
  }
) => {
  const response = await api.get('/instructor/all', {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

type QueryFnType = typeof getInstructors;

type UseInstructorsOptions = {
  page: number;
  size: number;
  config?: QueryConfig<QueryFnType>;
};

export const useInstructors = (
  { config, page, size }: UseInstructorsOptions = { page: 0, size: 12 }
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['instructors', page, size],
    queryFn: () => getInstructors({ page, size }),
  });
};
