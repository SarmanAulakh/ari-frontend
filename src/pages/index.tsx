import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import CategoryCard from 'src/components/Cards/CategoryCard';
import GameCard from 'src/components/Cards/GameCard';

import { useState } from 'react';
import apiClient from 'src/util/apiClient';

import { Game, GenreList } from 'types/game';
import { Genres } from 'constants/game';
import { Dropdown } from '@ari/ui-components';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import Head from 'src/components/Head';

export const getServerSideProps: GetServerSideProps = async () => {
  let res = await apiClient.get('game');

  return {
    props: {
      games: res?.data ?? null,
    },
  };
};

export default function Home({ games }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [categoryFilter, setCategoryFilter] = useState<GenreList | null>(null);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const updateCategoryFilter = (filter: GenreList | null) => {
    setCategoryFilter(filter);
  };

  return (
    <Container maxWidth="xl" sx={{ background: 'transparent', height: '100%' }}>
      <Head
        title="Store | ari"
        description="ari is the ultimate platform to truly own, collect, and trade your digital games."
      />

      <div id="blue-ellipse" />
      <div id="purple-ellipse" />

      <main>
        <Typography variant="h2" mt={12} mb={2}>
          Store
        </Typography>
        <Grid container spacing={2}>
          {matchDownSM ? (
            <Box ml={2} my={2}>
              <Dropdown
                placeholder="Select a genre"
                values={Object.values(Genres)}
                width={300}
                onChange={updateCategoryFilter}
              />
            </Box>
          ) : (
            <Grid container item spacing={3}>
              <Grid item md={3} sm={6} xs={12}>
                <CategoryCard category={Genres.ACTION} filter={categoryFilter} onClick={updateCategoryFilter} />
              </Grid>
              <Grid item md={3} sm={6} display={{ xs: 'none', sm: 'block' }}>
                <CategoryCard category={Genres.FPS} filter={categoryFilter} onClick={updateCategoryFilter} />
              </Grid>
              <Grid item md={3} sm={6} display={{ xs: 'none', sm: 'block' }}>
                <CategoryCard category={Genres.RPG} filter={categoryFilter} onClick={updateCategoryFilter} />
              </Grid>
              <Grid item md={3} sm={6} display={{ xs: 'none', sm: 'block' }}>
                <CategoryCard category={Genres.STRATEGY} filter={categoryFilter} onClick={updateCategoryFilter} />
              </Grid>
            </Grid>
          )}
          <Grid container item spacing={2}>
            {games?.map((game: Game) => {
              if (categoryFilter === null) {
                return (
                  <Grid item key={game.gameId} md={3} sm={6} xs={12}>
                    <GameCard
                      id={game.gameId}
                      name={game.displayName}
                      image={game.coverImage}
                      imageAlt="TODO"
                      price={game.price}
                      platforms={game.platforms}
                      discountPercent={null}
                    />
                  </Grid>
                );
              } else if (game?.genres?.includes(categoryFilter)) {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <GameCard
                      id={game.gameId}
                      name={game.displayName}
                      image={game.coverImage}
                      imageAlt="TODO"
                      price={game.price}
                      platforms={game.platforms}
                      discountPercent={null}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
