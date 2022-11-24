import { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { UserForm } from '@/components/user/UserForm';
import { useCreateUser } from '@/services/user/createUser';
import { UserFormValues } from '@/types/user';
import { formatUserFormValueToServer } from '@/utils/formatters';
import { createUserResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const createUserMutation = useCreateUser();
  const methods = useForm<UserFormValues>({
    resolver: createUserResolver,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async values => {
    try {
      const formattedValues = formatUserFormValueToServer(values);

      await createUserMutation.mutateAsync({
        data: formattedValues,
      });

      toast.success('Usuário cadastrado com sucesso!');

      router.push('/users');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar usuário!');
    }
  });

  return (
    <>
      <Head>
        <title>Usuários | Dohler CMS</title>
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
            Cadastre um novo usuário
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardContent>
              <FormProvider {...methods}>
                <UserForm />
              </FormProvider>
            </CardContent>

            <CardActions
              sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <Button
                component='a'
                variant='outlined'
                sx={{ mr: 2 }}
                onClick={() => router.back()}
              >
                Voltar
              </Button>

              <LoadingButton
                type='submit'
                variant='contained'
                loading={createUserMutation.isLoading || isSubmitting}
              >
                Cadastrar
              </LoadingButton>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
