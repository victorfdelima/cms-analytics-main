import { Box, Container } from '@mui/material';

import { customers } from '@/__mocks__/customers';
import { CustomerListResults } from '@/components/customer/customer-list-results';
import { CustomerListToolbar } from '@/components/customer/customer-list-toolbar';
import { DashboardLayout } from '@/components/dashboard-layout';
import Head from 'next/head';

const Page = () => (
  <>
    <Head>
      <title>Customers | Dohler CMS</title>
    </Head>
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
