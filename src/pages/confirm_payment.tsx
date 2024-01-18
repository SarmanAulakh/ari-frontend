import { Container, Typography, Box } from '@mui/material';
import Head from 'src/components/Head';

export default function ConfirmPayment() {
  return (
    <Container maxWidth="xl">
      <Head title="Confirmation | icari" description="Purchase confirmation page" />

      <div id="blue-ellipse" />

      <main>
        <Box mt={15}>
          <Typography variant="h3">
            Thanks for your purchase! :&#41;
          </Typography>
          <Typography mt={2}>
            A confirmation has ben emailed to you. To play your game, please install it in the icari client.
          </Typography>
        </Box>
      </main>
    </Container>
  );
}
