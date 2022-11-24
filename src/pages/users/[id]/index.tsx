import { ReactElement } from 'react';
import { toast } from 'react-toastify';

import {
  // ModeEdit as ModeEditIcon,
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
import { useUser } from '@/services/user/getUser';
import { getInitials } from '@/utils/get-initials';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const userQuery = useUser({ userId });

  if (userQuery.error) {
    toast.error('Erro ao carregar usuário!');
  }

  if (userQuery.isLoading || !userQuery.data) {
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

  const user = userQuery.data;

  return (
    <>
      <Head>
        <title>Usuários Admin | Dohler CMS</title>
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
              Usuário
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
              {user.fullName}
            </Typography>

            {/* <Button
              startIcon={<ModeEditIcon />}
              variant='contained'
              onClick={() => router.push(`/users/${userId}/edit`)}
            >
              Editar
            </Button> */}
          </Box>

          <Card
            sx={{
              mb: 3,
              p: 5,
            }}
          >
            <CardHeader
              title={<Typography variant='h3'>Detalhes</Typography>}
              sx={{ padding: 2 }}
            />

            <CardContent sx={{ padding: 2 }}>
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar sx={{ width: 200, height: 200 }}>
                    {getInitials(user.fullName)}
                  </Avatar>
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Nome completo
                        </Typography>

                        <Typography>{user.fullName}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Telefone
                        </Typography>

                        <Typography>{user.phone}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Tipo de usuário
                        </Typography>

                        <Typography>
                          {user.userType === 'ADMIN'
                            ? 'Administrador'
                            : 'Usuário'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          E-mail
                        </Typography>

                        {user.email && <Typography>{user.email}</Typography>}
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Data de nascimento
                        </Typography>

                        <Typography>{user.birthday}</Typography>
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ mb: 2 }} divider disableGutters disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='h5' fontWeight='bold'>
                          Localização
                        </Typography>

                        <Typography>
                          {user.city} - {user.state}
                        </Typography>
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
