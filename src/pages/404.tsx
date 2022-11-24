import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Typography } from '@mui/material';

import Head from 'next/head';
import NextLink from 'next/link';

const Page = () => (
  <>
    <Head>
      <title>404 | Dohler CMS</title>
    </Head>
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography align='center' color='textPrimary' variant='h1'>
            404 - Essa página que você deseja procurar não existe.
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            Ou você tentou alguma rota que você não tem permissão ou veio aqui
            por engano. Seja qual for, tente usar a navegação
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt='Em desenvolvimento'
              src='/static/images/undraw_page_not_found_su7k.svg'
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
          <NextLink href='/' passHref>
            <Button
              component='a'
              startIcon={<ArrowBackIcon fontSize='small' />}
              sx={{ mt: 3 }}
              variant='contained'
            >
              Voltar para tela inicial
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
