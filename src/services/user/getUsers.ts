import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import api from '../api';

interface GetUsersParams {
  limit?: number;
  userType?: string;
}

export const getUsers = async (
  { limit, userType }: GetUsersParams = { limit: 12, userType: 'CONSUMER' }
) => {
  const response = await api.get('/user/all', {
    params: {
      limit,
      userType,
    },
  });

  return response.data;
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  limit?: number;
  userType?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config, limit, userType }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users', limit, userType],
    queryFn: () => getUsers({ limit, userType }),
  });
};
