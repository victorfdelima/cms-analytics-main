import { useForm } from 'react-hook-form';

import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { useAuthContext } from '@/contexts/AuthContext';
import { LoginFormValues } from '@/types/auth';
import { loginResolver } from '@/utils/yup-schemas';
import Head from 'next/head';

const Login = () => {
  const authContext = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: loginResolver,
    defaultValues: {
      email: 'teste@email.com',
      password: 'pass1231',
    },
  });

  const onSubmit = handleSubmit(async values => {
    await authContext.signIn(values);
  });

  return (
    <>
      <Head>
        <title>Login | Dohler CMS</title>
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
        <Container maxWidth='sm'>
          <form onSubmit={onSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4'>
                Entrar
              </Typography>
            </Box>

            <TextField
              error={Boolean(errors?.email)}
              fullWidth
              helperText={errors.email?.message}
              label='Endereço de e-mail'
              margin='normal'
              type='email'
              variant='outlined'
              {...register('email')}
            />

            <TextField
              error={Boolean(errors?.password)}
              fullWidth
              helperText={errors?.password?.message}
              label='Senha'
              margin='normal'
              type='password'
              variant='outlined'
              {...register('password')}
            />

            <Box sx={{ py: 2 }}>
              <Button
                color='primary'
                disabled={isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Entrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
