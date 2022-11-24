import { queryClient, MutationConfig } from '@/lib/react-query';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export const deleteUser = async ({ userId }: { userId: string }) => {
  const response = await api.delete<User>(`/user/delete/${userId}`);

  return response.data;
};

type QueryFnType = typeof deleteUser;

type UseDeleteUserOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  return useMutation(deleteUser, {
    onMutate: async deletedUser => {
      await queryClient.cancelQueries(['users'], {
        exact: false,
      });

      const previousUsers = queryClient.getQueryData<User[]>(['users'], {
        exact: false,
      });

      queryClient.setQueriesData(
        ['users'],
        previousUsers?.filter(user => user.id !== Number(deletedUser.userId))
      );

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueriesData(['users'], context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'], {
        exact: false,
      });
    },
    ...config,
  });
};
