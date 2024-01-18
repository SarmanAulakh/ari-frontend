import type { NextPage } from 'next';
import { Container, Stack, Typography } from '@mui/material';
import Head from 'src/components/Head';

const ErrorPage404: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Head title="404 | ari" description="Page not found" />

      <div id="blue-ellipse" />

      <main>
        <Stack justifyContent="center" height="60vh" mt={12} mb={2}>
          <Typography textAlign="center" variant="h2">
            404 - Page Not Found
          </Typography>
        </Stack>
      </main>
    </Container>
  );
};

export default ErrorPage404;
