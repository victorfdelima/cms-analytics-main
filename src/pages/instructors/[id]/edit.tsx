import { useState, useMemo, ReactElement, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { InstructorForm } from '@/components/instructor/InstructorForm';
import { queryClient } from '@/lib/react-query';
import { NextPageWithLayout } from '@/pages/_app';
import api from '@/services/api';
import { getProfileImage, uploadProfileImage } from '@/services/instructor';
import { useDeleteInstructor } from '@/services/instructor/deleteInstructor';
import { useInstructor } from '@/services/instructor/getInstructor';
import { InstructorFormValues } from '@/types/instructor';
import {
  formatInstructorFormValueToServer,
  formatInstructorToFormValues,
} from '@/utils/formatters';
import { instructorResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const Page: NextPageWithLayout = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const router = useRouter();
  const instructorId = router.query.id as string;
  const instructorQuery = useInstructor({ instructorId });
  const imageQuery = useQuery({
    queryKey: ['instructorAvatar', instructorId],
    queryFn: () => getProfileImage(instructorId),
  });
  const deleteInstructorMutation = useDeleteInstructor();

  const methods = useForm<InstructorFormValues>({
    resolver: instructorResolver,
    defaultValues: useMemo(
      () =>
        instructorQuery.data &&
        formatInstructorToFormValues(instructorQuery.data),
      [instructorQuery.data]
    ),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (instructorQuery.data) {
      reset(formatInstructorToFormValues(instructorQuery.data));
    }
  }, [instructorQuery.data, reset]);

  const onSubmit = handleSubmit(async values => {
    try {
      const formattedValues = formatInstructorFormValueToServer(values);

      await api.put(`/instructor/edit/${instructorId}`, formattedValues);

      if (values.avatar[0]) {
        await uploadProfileImage(values.avatar[0], instructorId);
      }

      toast.success('Instrutor atualizado com sucesso!');

      await queryClient.refetchQueries(['instructor', instructorId]);

      router.push('/instructors');
    } catch {
      toast.error('Erro ao atualizar instrutor!');
    }
  });

  const handleCloseModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDeleteInstructor = async () => {
    try {
      await deleteInstructorMutation.mutateAsync({ instructorId });

      router.push('/instructors');
    } catch {
      toast.error('Erro ao excluir instrutor!');
    } finally {
      handleCloseModal();
    }
  };

  if (instructorQuery.isLoading || !instructorQuery.data) {
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

  const instructor = instructorQuery.data;

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
            {instructor.fullName}
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardHeader title='Editar instrutor' />

            <CardContent>
              <FormProvider {...methods}>
                <InstructorForm avatarDefaultURL={imageQuery.data} />
              </FormProvider>
            </CardContent>

            <CardActions
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Button color='error' onClick={() => setDeleteModalIsOpen(true)}>
                Excluir
              </Button>

              <Stack direction='row' spacing={2}>
                <Button
                  component='a'
                  variant='outlined'
                  onClick={() => router.push('/instructors')}
                >
                  Cancelar
                </Button>

                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  Atualizar
                </LoadingButton>
              </Stack>
            </CardActions>
          </Card>
        </Container>
      </Box>

      <Dialog
        open={deleteModalIsOpen}
        onClose={handleCloseModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Deseja apagar este instrutor?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>

          <LoadingButton
            onClick={handleDeleteInstructor}
            autoFocus
            variant='contained'
            color='error'
            loading={deleteInstructorMutation.isLoading}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
