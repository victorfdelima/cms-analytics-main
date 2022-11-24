import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ModeEdit as ModeEditIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { getCourseById } from '@/services/course';
import { Course } from '@/types/course';
import { Image } from 'mui-image';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await getCourseById(id);

        setCourse(response.data);
      } catch {
        toast.error('Erro ao buscar curso!');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

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
          <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
              Cursos
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography
              color='textPrimary'
              variant='h4'
              sx={{ display: 'inline-block' }}
            >
              {course.title}
            </Typography>
            <Button
              startIcon={<ModeEditIcon />}
              variant='contained'
              onClick={() => router.push(`/courses/${id}/edit`)}
            >
              Editar
            </Button>
          </Box>

          <Card>
            <CardHeader
              title={<Typography variant='h3'>Detalhes</Typography>}
              sx={{ padding: 2 }}
            />

            <CardContent sx={{ padding: 2 }}>
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Image src={course.coverImage} />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Nome
                        </Typography>

                        <Typography>{course.title}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Descrição
                        </Typography>

                        <Typography>{course.description}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Categoria
                        </Typography>

                        <Typography>{course.category}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Duração
                        </Typography>

                        <Typography>{course.duration}</Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
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
