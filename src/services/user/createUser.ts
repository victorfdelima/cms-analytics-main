import { queryClient, MutationConfig } from '@/lib/react-query';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

export interface CreateUserDTO {
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

export const createUser = async ({ data }: CreateUserDTO) => {
  const response = await api.post<User>('/admin/register', data);

  return response.data;
};

type QueryFnType = typeof createUser;

type UseCreateUserOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useCreateUser = ({ config }: UseCreateUserOptions = {}) => {
  return useMutation(createUser, {
    onMutate: async newUser => {
      await queryClient.cancelQueries(['users']);

      const previousUsers = queryClient.getQueryData<User[]>(['users']);

      queryClient.setQueryData(
        ['users'],
        [...(previousUsers || []), newUser.data]
      );

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
    ...config,
  });
};
