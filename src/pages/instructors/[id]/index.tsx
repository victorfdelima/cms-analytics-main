import { ReactElement } from 'react';

import {
  ModeEdit as ModeEditIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {
  Avatar,
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
import { getProfileImage } from '@/services/instructor';
import { useInstructor } from '@/services/instructor/getInstructor';
import { getInitials } from '@/utils/get-initials';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const instructorId = router.query.id as string;
  const instructorQuery = useInstructor({ instructorId });
  const imageQuery = useQuery({
    queryKey: ['instructorAvatar', instructorId],
    queryFn: () => getProfileImage(instructorId),
  })

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
          <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
              Instrutores
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
              {instructor.fullName}
            </Typography>
            <Button
              startIcon={<ModeEditIcon />}
              variant='contained'
              onClick={() => router.push(`/instructors/${instructorId}/edit`)}
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
                  <Avatar
                    src={imageQuery.data}
                    sx={{ width: 200, height: 200 }}
                  >
                    {getInitials(instructor.fullName)}
                  </Avatar>
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Nome completo
                        </Typography>

                        <Typography>{instructor.fullName}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Breve descrição
                        </Typography>

                        <Typography>{instructor.shortDescription}</Typography>
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

                        <Typography>{instructor.description}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Assuntos abordados
                        </Typography>

                        {instructor.teachingList.map(teaching => (
                          <Typography key={teaching}>{teaching}</Typography>
                        ))}
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Facebook
                        </Typography>

                        <Typography>{instructor.sso?.FACEBOOK}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Instagram
                        </Typography>

                        <Typography>{instructor.sso?.INSTAGRAM}</Typography>
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
