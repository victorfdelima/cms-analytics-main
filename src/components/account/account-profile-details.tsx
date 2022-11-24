import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

import { useAuthContext } from '@/contexts/AuthContext';
import { useUpdateUser } from '@/services/user/updateUser';
import { UserFormValues } from '@/types/user';
import {
  formatUserFormValueToServer,
  formatUserToFormValues,
} from '@/utils/formatters';
import { createUserResolver } from '@/utils/yup-schemas';
import { useRouter } from 'next/router';

import { UserForm } from '../user/UserForm';

export const AccountProfileDetails = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const updateUserMutation = useUpdateUser();

  const methods = useForm<UserFormValues>({
    resolver: createUserResolver,
    defaultValues: useMemo(() => user && formatUserToFormValues(user), [user]),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async values => {
    try {
      const data = formatUserFormValueToServer(values);

      await updateUserMutation.mutateAsync({
        userId: user.id,
        data,
      });

      toast.success('Usuário atualizado com sucesso!');
      router.push('/users');
    } catch (error) {
      toast.error('Erro ao atualizar usuário!');
    }
  });

  return (
    <Card component='form' onSubmit={onSubmit}>
      <CardHeader
        subheader='Essas informações podem ser alteradas'
        title='Informações Pessoais'
      />

      <Divider />

      <CardContent>
        <FormProvider {...methods}>
          <UserForm isEditing />
        </FormProvider>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <LoadingButton
          type='submit'
          variant='contained'
          loading={updateUserMutation.isLoading || isSubmitting}
        >
          Salvar informações
        </LoadingButton>
      </Box>
    </Card>
  );
};
