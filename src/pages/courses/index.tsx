import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { CourseList } from '@/components/course/CourseList';
import { CourseToolbar } from '@/components/course/CourseToolbar';
import { DashboardLayout } from '@/components/dashboard-layout';
import { getAllCourses } from '@/services/course';
import { Course } from '@/types/course';
import Head from 'next/head';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await getAllCourses(limit, page);

        setCourses(response.data.courses);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [limit, page]);

  if (isLoading) {
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
        <Container maxWidth={false}>
          <CourseToolbar />

          <Box sx={{ mt: 3 }}>
            {courses.length ? (
              <CourseList
                courses={courses}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
              />
            ) : (
              <Typography variant='h5' align='center'>
                Não existem cursos no sistema!
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
