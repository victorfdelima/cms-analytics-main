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

import { CourseForm } from '@/components/course/CourseForm';
import { DashboardLayout } from '@/components/dashboard-layout';
import { NextPageWithLayout } from '@/pages/_app';
import api from '@/services/api';
import {
  getClassImage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uploadClassImage,
} from '@/services/class';
import {
  getCourseById,
  getCoverImage,
  uploadCoverImage,
} from '@/services/course';
import { Course, CourseFormValues } from '@/types/course';
import {
  formatCourseFormValuesToServer,
  formatCourseToFormValues,
} from '@/utils/formatters';
import { courseResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const router = useRouter();

  const id = router.query.id as string;

  const methods = useForm<CourseFormValues>({
    resolver: courseResolver,
    defaultValues: useMemo(
      () => course && formatCourseToFormValues(course),
      [course]
    ),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await getCourseById(id);

        const coverImage = await getCoverImage(id);

        const classesWithImages = await Promise.all(
          response.data.classes.map(async (classItem: { id: string }) => {
            const coverImage = await getClassImage(classItem.id);

            return {
              ...classItem,
              coverImage,
            };
          })
        );
        const course = {
          ...response.data,
          classes: classesWithImages,
          coverImage,
        };

        setCourse(course);

        reset(formatCourseToFormValues(course));
      } catch (error) {
        toast.error('Erro ao buscar curso!');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = handleSubmit(async values => {
    try {
      const formattedValues = formatCourseFormValuesToServer(values);

      await api.put(`/course/edit/${id}`, formattedValues);

      if (values.coverImage[0]) {
        await uploadCoverImage(values.coverImage[0], id);
      }

      // TODO remove comments
      // if (values.classes.length) {
      //   await Promise.all(
      //     values.classes.map(async classItem => {
      //       if (classItem.coverImage[0]) {
      //         await uploadClassImage(classItem.coverImage[0], classItem.id);
      //       }
      //     })
      //   );
      // }

      toast.success('Curso atualizado com sucesso!');
      router.push('/courses');
    } catch {
      toast.error('Erro ao atualizar curso!');
    }
  });

  const handleCloseModal = () => {
    setDeleteModalIsOpen(false);
  };

  if (!course || isLoading) {
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
        <title>Cursos | Dohler CMS</title>
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
            {course.title}
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardHeader title='Editar curso' />

            <CardContent>
              <FormProvider {...methods}>
                <CourseForm
                  courseImageURL={course.coverImage}
                  classes={course.classes}
                />
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
          Deseja apagar este curso?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
