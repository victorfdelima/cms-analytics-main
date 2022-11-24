import { queryClient, MutationConfig } from '@/lib/react-query';
import { Instructor } from '@/types/instructor';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export interface CreateInstructorDTO {
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

export const createInstructor = async ({ data }: CreateInstructorDTO) => {
  const response = await api.post<Instructor>('/instructor/create', data);

  return response.data;
};

type QueryFnType = typeof createInstructor;

type useCreateInstructorOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useCreateInstructor = ({
  config,
}: useCreateInstructorOptions = {}) => {
  return useMutation(createInstructor, {
    onMutate: async newInstructor => {
      await queryClient.cancelQueries(['instructors']);

      const previousInstructors = queryClient.getQueryData<Instructor[]>([
        'instructors',
      ]);

      queryClient.setQueryData(
        ['instructors'],
        [...(previousInstructors || []), newInstructor.data]
      );

      return { previousInstructors };
    },
    onError: (_, __, context: any) => {
      if (context?.previousInstructors) {
        queryClient.setQueryData(['instructors'], context.previousInstructors);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['instructors']);
    },
    ...config,
  });
};
