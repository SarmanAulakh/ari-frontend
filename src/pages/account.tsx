/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'src/components/Head';
import Image from 'next/image';
import { NAVBAR_SIZE } from 'src/styles/size';
import { Avatar, Box, Container, Stack, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';

import { shortenAddress, Tab, Tabs, Tag, TabPanel, Loader } from '@icari-io/ui-components';

import EthImage from 'src/assets/icons/currency/eth.svg';
import UserGameCard from 'src/components/Cards/UserGameCard';
import { useWeb3Auth } from 'src/services/auth';
import { useRouter } from 'next/router';
import getNFTs from 'src/services/web3';
import { ipfsRawToGatewayUrl } from 'src/util/web3';

const staticData = {
  bannerImage: {
    src: 'https://storage.googleapis.com/icari-game-images/banners/antman/large.webp',
    alt: 'TODO',
  },
  lastPlayed: 'Coming Soon ...',
};

const Account: NextPage = () => {
  const [value, setValue] = useState(0);
  const [userNfts, setUserNfts] = useState<any[]>([]);
  const { initialized, isLoading, user, userDetails, setUserInfo } = useWeb3Auth();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const updateUserNfts = async () => {
      const res = await getNFTs(user || "");
      setUserNfts(res);
    };

    if (initialized && !isLoading) {
      if (user) {
        if (!userDetails) {
          setUserInfo();
        } else {
          updateUserNfts();
        }
      } else {
        router.push({
          pathname: '/login',
          query: { returnUrl: router.basePath },
        });
      }
    }
  }, [user, userDetails]);

  return (
    <>
      <img
        src={staticData.bannerImage.src}
        alt={staticData.bannerImage.alt}
        style={{
          width: '100%',
          height: '300px',
          marginTop: `${NAVBAR_SIZE + 10}px`,
          objectFit: 'cover',
        }}
      />
      <Container maxWidth="xl">
        <Head title="Account | icari" description="Account page" />

        <div id="blue-ellipse" />
        <div id="purple-ellipse" />

        <main>
          <Box position="relative">
            <Box sx={{ mt: 9 }}>
              {isLoading ? (
                <Loader />
              ) : (
                <Stack alignItems="center">
                  <Box position="absolute" top={-150}>
                    <Avatar alt="TODO" src={(userDetails as any)?.profileImage} sx={{ width: 150, height: 150 }} />
                  </Box>
                  <Typography variant="h4" mt={2}>
                    {(userDetails as any)?.name || (userDetails as any)?.email}
                  </Typography>
                  <Typography my={1}>Last played: {staticData.lastPlayed}</Typography>
                  <Tag label={shortenAddress(user || '')} startIcon={<Image src={EthImage} alt="TODO" />} />
                  <Box
                    my={2}
                    sx={{
                      width: '80%',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Tabs value={value} onChange={handleChange} aria-label="styled tabs example">
                      <Tab label="Games" index={0} />
                    </Tabs>
                  </Box>
                  <TabPanel index={0} value={value} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                      {userNfts.length !== 0 && userNfts.map(({ metadata}: any) => (
                        <Grid item lg={3} md={4} sm={6} xs={12} key={metadata.gameId}>
                          <UserGameCard
                            id={metadata.gameId}
                            name={metadata.name}
                            image={ipfsRawToGatewayUrl(metadata.image)}
                            imageAlt="TODO"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                </Stack>
              )}
            </Box>
          </Box>
        </main>
      </Container>
    </>
  );
};

export default Account;
