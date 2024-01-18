import 'src/styles/globals.css';
import 'src/styles/ThumbnailSlider.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from 'src/services/auth';
import { themes, Loader } from '@ari/ui-components';

import Navbar from 'src/components/Navbar/Navbar';
import usePageLoading from 'src/util/usePageLoading';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('src/components/Footer'));

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const pageLoading = usePageLoading();

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={isDarkTheme ? themes.darkTheme : themes.lightTheme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Box
          sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Navbar changeTheme={changeTheme} />
          <Toolbar />
          <Box sx={{ flexGrow: 5 }}>
            {pageLoading && <Loader />}
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}
