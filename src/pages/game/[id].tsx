import { Button, Tag } from '@icari-io/ui-components';
import { Box, Breadcrumbs, Container, Divider, Typography, Link as MuiLink, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import ThumbnailCarousel from 'src/components/ThumbnailCarousel/ThumbnailCarousel';
import Head from 'src/components/Head';
import apiClient from 'src/util/apiClient';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import SystemRequirements from 'src/components/SystemRequirements';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const res = await apiClient.get(`game/${context.params.id}`);

  if (res.status !== 200 || res.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      gameData: res.data ?? null,
    },
  };
};

export default function GameDetailsPage({ gameData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (!gameData) {
    return <div>LOADING</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0, sm: 2 } }}>
      <Head title={`${gameData.displayName} | icari`} description={gameData.description} />

      <div id="blue-ellipse" />
      <div id="purple-ellipse" />
      <main>
        <Box mt={12}>
          <Box display={{ xs: 'block', md: 'none' }}>
            <ThumbnailCarousel images={gameData.bannerImages} />
          </Box>
          <Grid container px={{ xs: 2, sm: 0 }}>
            <Grid item md={6} pr={{ xs: 0, md: 8 }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="/">Games</Link>
                <Typography color="text.primary">{gameData.displayName}</Typography>
              </Breadcrumbs>
              <Typography variant="h1" mt={1}>
                {gameData.displayName}
              </Typography>
              <Grid container my={4}>
                {gameData.tags.map((tag: string) => (
                  <Grid item pr={2} key={tag}>
                    <Tag label={tag.toUpperCase()} backgroundColor="#341E60" textColor="white" />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h6" mb={1}>
                Current Price
              </Typography>
              <Grid item container alignItems="center">
                <Grid item mr={6}>
                  <Typography variant="h2">${gameData.price.USD} USD</Typography>
                </Grid>
                <Grid item>
                  <Link href={`/buy/${router.query.id}`}>
                    <Button
                      colorType="gradient"
                      sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '16px',
                        width: {
                          xs: 'max-content',
                          sm: '200px',
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </Grid>
              </Grid>

              <Typography variant="h5" mt={4}>
                Description
              </Typography>
              <Typography variant="h6" mt={2}>
                {gameData.description}
              </Typography>
              <Box display={{ xs: 'none', md: 'block' }}>
                <SystemRequirements {...gameData.systemRequirements} />
              </Box>
            </Grid>
            <Grid item md={6} p={{ xs: 0, sm: 2 }}>
              <Box display={{ xs: 'none', md: 'block' }}>
                <ThumbnailCarousel images={gameData.bannerImages} />
              </Box>
              <Grid container item spacing={2} mt={4}>
                <Grid container item xs={12} spacing={1}>
                  <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6">Platforms</Typography>
                    <Typography>{gameData.platforms.join(', ')}</Typography>
                  </Grid>
                  <Divider sx={{ color: 'black', width: '100%' }} />
                  <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6">Release Date</Typography>
                    <Typography>{gameData.releaseDate}</Typography>
                  </Grid>
                  <Divider sx={{ color: 'black', width: '100%' }} />
                  <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6">Company</Typography>
                    <Typography>{gameData.company}</Typography>
                  </Grid>
                  <Divider sx={{ color: 'black', width: '100%' }} />
                  <Grid container item xs={12} justifyContent="space-between">
                    <Grid item xs={8}>
                      <Typography variant="h6">Rating</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography textAlign="right">{gameData.esrbRating}</Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ color: 'black', width: '100%' }} />
                  <Grid container item xs={12} justifyContent="space-between">
                    <Typography variant="h6">Languages</Typography>
                    <Typography>{gameData.languages.join(', ')}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Box display={{ xs: 'block', md: 'none' }}>
                <SystemRequirements {...gameData.systemRequirements} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </Container>
  );
}
