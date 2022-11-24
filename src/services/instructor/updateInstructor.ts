import { queryClient, MutationConfig } from '@/lib/react-query';
import { Instructor } from '@/types/instructor';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export interface UpdateInstructorDTO {
  instructorId: string;
  data: {
    fullName: string;
    shortDescription: string;
    description: string;
    teaching: string[];
    sso: {
      FACEBOOK: string;
      INSTAGRAM: string;
    };
  };
}

export const updateInstructor = async ({
  instructorId,
  data,
}: UpdateInstructorDTO) => {
  const response = await api.put<Instructor>(
    `/instructor/${instructorId}/edit`,
    data
  );

  return response.data;
};

type QueryFnType = typeof updateInstructor;

type UseUpdateInstructorOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useUpdateInstructor = ({
  config,
}: UseUpdateInstructorOptions = {}) => {
  return useMutation(updateInstructor, {
    onMutate: async (updatingInstructor: any) => {
      await queryClient.cancelQueries([
        'instructor',
        updatingInstructor?.instructorId,
      ]);

      const previousInstructor = queryClient.getQueryData<Instructor>([
        'instructor',
        updatingInstructor?.instructorId,
      ]);

      queryClient.setQueryData(
        ['instructor', updatingInstructor?.instructorId],
        {
          ...previousInstructor,
          ...updatingInstructor.data,
          id: updatingInstructor.instructorId,
        }
      );

      return { previousInstructor };
    },
    onError: (_, __, context: any) => {
      if (context?.previousInstructor) {
        queryClient.setQueryData(
          ['instructor', context.previousInstructor.id],
          context.previousInstructor
        );
      }
    },
    onSuccess: data => {
      queryClient.refetchQueries(['instructor', data.id]);
    },
    ...config,
  });
};
