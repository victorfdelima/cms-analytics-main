import { ReactElement, useState } from 'react';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { DashboardLayout } from '@/components/dashboard-layout';
import { InstructorListResults } from '@/components/instructor/InstructorListResults';
import { InstructorListToolbar } from '@/components/instructor/InstructorListToolbar';
import { useInstructors } from '@/services/instructor/getInstructors';
import Head from 'next/head';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const instructorsQuery = useInstructors({ page, size: limit });

  if (instructorsQuery.isLoading) {
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
        <title>Instrutores | Dohler CMS</title>
      </Head>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <InstructorListToolbar onSearchChange={setSearch} />

          <Box sx={{ mt: 3 }}>
            {instructorsQuery?.data?.instructors ? (
              <InstructorListResults
                instructors={instructorsQuery.data.instructors}
                searchBy={search}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
              />
            ) : (
              <Typography variant='h5' align='center'>
                Não existem instrutores no sistema!
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
