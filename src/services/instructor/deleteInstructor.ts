import { queryClient, MutationConfig } from '@/lib/react-query';
import { Instructor } from '@/types/instructor';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export const deleteInstructor = async ({
  instructorId,
}: {
  instructorId: string;
}) => {
  const response = await api.delete<Instructor>(
    `/instructor/delete/${instructorId}`
  );

  return response.data;
};

type QueryFnType = typeof deleteInstructor;

type UseDeleteInstructorOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useDeleteInstructor = ({
  config,
}: UseDeleteInstructorOptions = {}) => {
  return useMutation(deleteInstructor, {
    onMutate: async deletedInstructor => {
      await queryClient.cancelQueries(['instructors'], {
        exact: false,
      });

      const previousInstructors = queryClient.getQueryData<{
        instructors: Instructor[];
      }>(['instructors'], {
        exact: false,
      });

      queryClient.setQueriesData(['instructors'], {
        ...previousInstructors,
        instructors: previousInstructors?.instructors?.filter(
          instructor => instructor.id !== Number(deletedInstructor.instructorId)
        ),
      });

      return { previousInstructors };
    },
    onError: (_, __, context: any) => {
      if (context?.previousInstructors) {
        queryClient.setQueriesData(
          ['instructors'],
          context.previousInstructors
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['instructors'], {
        exact: false,
      });
    },
    ...config,
  });
};
