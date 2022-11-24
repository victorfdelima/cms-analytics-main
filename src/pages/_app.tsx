import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Loading from '../components/Loading/index';
import { AuthConsumer, AuthProvider } from '@/contexts/AuthContext';
import { queryClient } from '@/lib/react-query';
import { theme } from '@/theme';
import { createEmotionCache } from '@/utils/create-emotion-cache';
import { registerChartJs } from '@/utils/register-chart-js';
import { CacheProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import 'react-toastify/dist/ReactToastify.min.css';

registerChartJs();

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: ReturnType<typeof createEmotionCache>;
};

const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Dohler CMS</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <AuthConsumer>
                {auth =>
                  auth.isLoading ? (
                    <Loading />
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )
                }
              </AuthConsumer>
              <ToastContainer autoClose={3000} />
            </AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default App;
