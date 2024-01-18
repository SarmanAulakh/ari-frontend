import type { NextPage } from 'next';
import { Container, Stack, Typography } from '@mui/material';
import Head from 'src/components/Head';

const NotWhitelistedPage: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Head title="icari | No Beta Access" description="No beta access" />

      <div id="blue-ellipse" />

      <main>
        <Stack justifyContent="center" height="60vh" mt={12} mb={2}>
          <Typography textAlign="center" variant="h2">
            Sorry, you do not have access to the icari closed beta!
          </Typography>
        </Stack>
      </main>
    </Container>
  );
};

export default NotWhitelistedPage;
