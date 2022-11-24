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

import { CourseForm } from '@/components/course/CourseForm';
import { DashboardLayout } from '@/components/dashboard-layout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadClassImage } from '@/services/class';
import { createCourse, uploadCoverImage } from '@/services/course';
import { CourseFormValues } from '@/types/course';
import { formatCourseFormValuesToServer } from '@/utils/formatters';
import { courseResolver } from '@/utils/yup-schemas';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const methods = useForm<CourseFormValues>({
    resolver: courseResolver,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(
    async values => {
      try {
        const formattedValues = formatCourseFormValuesToServer(values);

        const {
          data: {
            id,

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            classes,
          },
        } = await createCourse(formattedValues);

        if (values.coverImage[0]) {
          await uploadCoverImage(values.coverImage[0], id);
        }

        // TODO remove comments
        // if (values.classes.length) {
        //   await Promise.all(
        //     values.classes.map(async (classItem, index) => {
        //       if (classItem.coverImage[0]) {
        //         await uploadClassImage(
        //           classItem.coverImage[0],
        //           classes[index].id
        //         );
        //       }
        //     })
        //   );
        // }

        toast.success('Curso cadastrado com sucesso!');

        router.push('/courses');
      } catch (error) {
        console.log(error);
        toast.error('Erro ao cadastrar curso!');
      }
    },
    error => console.log(error)
  );

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
            Cursos - Criar novo
          </Typography>

          <Card component='form' onSubmit={onSubmit}>
            <CardContent>
              <FormProvider {...methods}>
                <CourseForm />
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
