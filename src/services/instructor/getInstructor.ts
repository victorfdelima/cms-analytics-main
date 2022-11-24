import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import api from '../api';

export const getInstructor = async ({
  instructorId,
}: {
  instructorId: string;
}) => {
  const response = await api.get(`/instructor/${instructorId}`);

  return response.data;
};

type QueryFnType = typeof getInstructor;

type UseInstructorOptions = {
  instructorId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useInstructor = ({
  instructorId,
  config,
}: UseInstructorOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['instructor', instructorId],
    queryFn: () => getInstructor({ instructorId }),
  });
};
