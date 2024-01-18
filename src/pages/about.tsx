import { Box, Container, Stack, styled, Typography } from '@mui/material';
import Head from 'src/components/Head';
import { Colors } from '@ari/ui-components';
import Image from 'next/image';
import TextGradient from 'src/components/TextGradient';
import ariLogo from 'src/assets/images/ari-logo-white-full.png';

export default function AboutPage() {
  return (
    <Container maxWidth="xl" sx={{ overflowX: 'clip' }}>
      <Head title="About | ari" description="Buy, Sell, and Trade digital video games" />

      <div id="blue-ellipse" />

      <main>
        <Stack mt={16} justifyContent="center" alignItems="center" spacing={2} sx={{ textAlign: 'center' }}>
          <Typography mb={8} variant="h1">
            <Image src={ariLogo} alt="ari logo" width={280} height={100} /> <br /> enables decentralized <br />
            <TextGradient>Game Ownership</TextGradient> <br /> with <TextGradient>Blockchain</TextGradient> Technology
          </Typography>
          <Image src="/images/about/portal_dogs.png" width={1253} height={368} alt="" />
          <Stack justifyContent="center" pt={{ xs: 0, md: 4 }} width={{ xs: '90%', md: '65%' }}>
            <Typography variant="h3">
              <TextGradient>Unlocking new opportunities</TextGradient>
            </Typography>
            <Typography variant="h4" mt={4} fontWeight={300}>
              For the first time, ari allows users to truly own their digital video games. Our goal is to provide
              ownership to players and create a world where even digital games can be bought, sold, and traded. Join us
              in the next evolution of digital game ownership!
            </Typography>
            <Typography variant="h3" mt={8}>
              <TextGradient>Owning your digital game</TextGradient>
            </Typography>
            <Typography variant="h4" mt={4} mb={{ xs: 6, md: 10 }} fontWeight={300}>
              ari utilizes blockchain technology to provide gamers with a means of true ownership of digital assets,
              where each game you own is represented by an NFT that you can trade or sell.
            </Typography>
          </Stack>
        </Stack>
      </main>
    </Container>
  );
}

const EmailInput = styled('input')({
  width: '60%',
  height: '100%',
  padding: '0px 20px',
  border: 'none',
  background: 'transparent',
  fontSize: 18,
  color: Colors.WHITE,
  '&::placeholder': {
    color: 'white',
  },
});

const ButtonIconSx = {
  fontSize: 40,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
};
