import type { NextPage } from 'next';
import { Container, Stack, Typography } from '@mui/material';
import Head from 'src/components/Head';
import Link from 'next/link';

const RefundPolicy: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Head title="Refund Policy| icari" description="Refund policy" />

      <div id="blue-ellipse" />

      <main>
        <Stack justifyContent="center" height="60vh" mt={12} mb={2}>
          <Typography textAlign="center" variant="h2">
            Refund Policy
          </Typography>
          <br/>
          <Typography textAlign="center">
            We are currently operating under a strict <b>NO REFUND</b> policy. All sales are <b>FINAL</b>. Should you have any technical
            issues, please contact us at contact@icari.io or fill out our <Link href="/support">support</Link> form and we will do our best to assist you!
          </Typography>
        </Stack>
      </main>
    </Container>
  );
};

export default RefundPolicy;
