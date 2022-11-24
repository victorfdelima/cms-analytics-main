import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { UserListResults } from '@/components/user/UserListResults';
import { UserListToolbar } from '@/components/user/UserListToolbar';
import { useUsers } from '@/services/user/getUsers';
import Head from 'next/head';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('CONSUMER');
  const usersQuery = useUsers({ userType, limit: 50 });

  const handleOnChange = (type: string) => {
    setUserType(type);
  };

  if (usersQuery.error) {
    toast.error('Erro ao carregar usuários!');
  }

  if (usersQuery.isLoading) {
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
        <title>Usuários | Dohler CMS</title>
      </Head>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar
            onSearchChange={setSearch}
            user={userType}
            onChange={handleOnChange}
          />

          <Box sx={{ mt: 3 }}>
            {usersQuery.data ? (
              <UserListResults users={usersQuery.data} searchBy={search} />
            ) : (
              <Typography variant='h5' align='center'>
                Não existem usuários no sistema!
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
