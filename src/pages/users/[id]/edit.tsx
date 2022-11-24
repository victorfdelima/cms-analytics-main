import { useState, useMemo, ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { DeleteUserModal } from '@/components/user/DeleteUserConfirmationModal';
import { UserForm } from '@/components/user/UserForm';
import { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/services/user/getUser';
import { useUpdateUser } from '@/services/user/updateUser';
import { UserFormValues } from '@/types/user';
import {
  formatUserFormValueToServer,
  formatUserToFormValues,
} from '@/utils/formatters';
import { createUserResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const userQuery = useUser({ userId });
  const updateUserMutation = useUpdateUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const user = userQuery.data;

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
        userId: Number(userId),
        data,
      });

      toast.success('Usuário atualizado com sucesso!');
      router.push('/users');
    } catch (error) {
      toast.error('Erro ao atualizar usuário!');
    }
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  if (userQuery.isLoading) {
    return (
      <Box
        component='main'
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Usuário - Editar | Dohler CMS</title>
      </Head>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Typography color='textPrimary' variant='h4' sx={{ mb: 3 }}>
            {user.fullName}
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardHeader title='Editar usuário' />

            <CardContent>
              <FormProvider {...methods}>
                <UserForm isEditing />
              </FormProvider>
            </CardContent>

            <CardActions
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              {/* <Button color='error' onClick={() => setModalIsOpen(true)}>
                Excluir
              </Button> */}

              <Stack direction='row' spacing={2}>
                <Button
                  component='a'
                  variant='outlined'
                  onClick={() => router.push('/users')}
                >
                  Cancelar
                </Button>

                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={updateUserMutation.isLoading || isSubmitting}
                >
                  Atualizar
                </LoadingButton>
              </Stack>
            </CardActions>
          </Card>
        </Container>
      </Box>

      <DeleteUserModal
        userId={userId}
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
