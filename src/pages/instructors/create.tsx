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
import { InstructorForm } from '@/components/instructor/InstructorForm';
import { queryClient } from '@/lib/react-query';
import api from '@/services/api';
import { uploadProfileImage } from '@/services/instructor';
import { InstructorFormValues } from '@/types/instructor';
import { formatInstructorFormValueToServer } from '@/utils/formatters';
import { instructorResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const methods = useForm<InstructorFormValues>({
    resolver: instructorResolver,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async values => {
    try {
      const formattedValues = formatInstructorFormValueToServer(values);

      const {
        data: { id },
      } = await api.post('/instructor/create', formattedValues);

      if (values.avatar[0]) {
        await uploadProfileImage(values.avatar[0], id);
      }

      await queryClient.invalidateQueries(['instructors']);

      toast.success('Instrutor cadastrado com sucesso!');

      router.push('/instructors');
    } catch (error) {
      toast.error('Erro ao cadastrar instrutor!');
    }
  });

  return (
    <>
      <Head>
        <title>Instrutores | Dohler CMS</title>
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
            Cadastre um novo instrutor(a)
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardContent>
              <FormProvider {...methods}>
                <InstructorForm />
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
                loading={isSubmitting}
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
