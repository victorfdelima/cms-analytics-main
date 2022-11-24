import { queryClient, MutationConfig } from '@/lib/react-query';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export interface UpdateUserDTO {
  userId: number;
  data: {
    email: string;
    fullName: string;
    phone: string;
    city: string;
    state: string;
    gender: string;
    birthday: string;
  };
}

export const updateUser = async ({ userId, data }: UpdateUserDTO) => {
  const response = await api.put<User>(`/user/${userId}/edit`, data);

  return response.data;
};

type QueryFnType = typeof updateUser;

type UseUpdateUserOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
  return useMutation(updateUser, {
    onMutate: async (updatingUser: any) => {
      await queryClient.cancelQueries(['user', updatingUser?.userId]);

      const previousUser = queryClient.getQueryData<User>([
        'user',
        updatingUser?.userId,
      ]);

      queryClient.setQueryData(['user', updatingUser?.userId], {
        ...previousUser,
        ...updatingUser.data,
        id: updatingUser.userId,
      });

      return { previousUser };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          ['user', context.previousUser.id],
          context.previousUser
        );
      }
    },
    onSuccess: data => {
      queryClient.refetchQueries(['user', data.id]);
    },
    ...config,
  });
};
