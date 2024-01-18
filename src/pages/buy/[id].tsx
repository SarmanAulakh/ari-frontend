import { Appearance, loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from 'src/components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Container, Typography, useTheme } from '@mui/material';
import { NAVBAR_SIZE } from 'src/styles/size';
import apiClient from 'src/util/apiClient';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useWeb3Auth } from 'src/services/auth';
import Head from 'src/components/Head';
import Image from 'next/image';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

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

export default function GameBuyPage({ gameData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [clientSecret, setClientSecret] = useState('');
  const { initialized, isLoading, user } = useWeb3Auth();

  useEffect(() => {
    if (initialized && !isLoading) {
      if (user) {
        apiClient
          .post('sale/create-payment-intent', {
            walletAddress: user,
            gameId: gameData?.gameId,
          })
          .then((res) => {
            setClientSecret(res.data.clientSecret);
          });
      } else {
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        });
      }
    }
  }, [user]);

  const appearance: Appearance = {
    theme: isDark ? 'night' : 'stripe',
    labels: 'floating',
    rules: {
      '.Input': {
        border: `2px solid ${isDark ? 'transparent' : ''}`,
      },
      '.Input:focus': {
        boxSize: 'content-box',
        border: '2px solid #8d49fb',
        boxShadow: '0px',
      },
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Container
      sx={{
        paddingTop: `${NAVBAR_SIZE + 40}px`,
        background: 'transparent',
        minHeight: '100vh',
      }}
    >
      <Head title="Buy | icari" description="Checkout page" />

      <main>
        <Image src={gameData?.coverImage} width={400} height={200} alt="" />
        <Typography fontSize={34} fontWeight="bold" mb={1}>
          Buy {' '}
          <Typography fontSize={34} fontWeight="bold" display="inline" color="GrayText">
            {gameData?.displayName}
          </Typography>
        </Typography>
        <Typography variant="h5" mb={4}>
          Price: {gameData.price.USD} USD
        </Typography>
        {clientSecret && (
          <Elements options={options} stripe={stripe}>
            <CheckoutForm walletAddress={user!} gameId={gameData.gameId} />
          </Elements>
        )}
      </main>
    </Container>
  );
}
