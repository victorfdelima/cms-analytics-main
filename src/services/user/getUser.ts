import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import api from '../api';

export const getUser = async ({ userId }: { userId: string }) => {
  const response = await api.get(`/user/${userId}`);

  return response.data;
};

type QueryFnType = typeof getUser;

type UseUsersOptions = {
  userId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUser = ({ userId, config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user', userId],
    queryFn: () => getUser({ userId }),
  });
};
