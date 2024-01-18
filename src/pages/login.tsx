import * as React from 'react';
import { WALLET_ADAPTERS } from '@web3auth/base';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useWeb3Auth } from 'src/services/auth';
import Head from 'src/components/Head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '@ari/ui-components';
import apiClient from 'src/util/apiClient';
import LoadingButton from '@mui/lab/LoadingButton';

export default function SignInSide() {
  const { login, isLoading } = useWeb3Auth();
  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [betaDialogOpen, setBetaDialogOpen] = useState(false);
  const [betaApplyLoading, setBetaApplyLoading] = useState(false);
  const [betaApplySuccess, setBetaApplySuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  function handleBetaDialogClose() {
    setBetaDialogOpen(false);
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as any)[0].value;

    setSubmittedEmail(email);

    const userDetails = await apiClient.get(`/user/email/${email}`).catch((e) => {
      setBetaDialogOpen(true);
    });

    if (!userDetails?.data.betaWhitelisted) {
      setBetaDialogOpen(true);
      return;
    }

    login(WALLET_ADAPTERS.OPENLOGIN, 'email_passwordless', email).then((walletAddress: string) => {
      apiClient.post('/user/login', { email, walletAddress });
    });
  };

  const handleApplyBeta = async () => {
    setBetaApplyLoading(true);
    const res = await apiClient.post('/user/apply-beta', { email: submittedEmail });
    if (res) {
      setBetaApplyLoading(false);
      setBetaApplySuccess(true);
    }
  };

  const redirect = () => {
    router.push('/');
  };

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    setIsValidEmail(result);
  };

  return (
    <>
      <Head title="Login | ari" description="Login page" />
      <Grid
        container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          p="40px"
          component={Paper}
          elevation={1}
          square
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="center">
            <Grid
              item
              md={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '350px',
              }}
            >
              <Typography
                sx={{
                  marginTop: '20px',
                  fontWeight: 'bold',
                  fontSize: 32,
                }}
              >
                Log In
              </Typography>
              {isLoading ? (
                <CircularProgress disableShrink />
              ) : (
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={validateEmail}
                  />
                  <Button
                    type="submit"
                    colorType="gradient"
                    textColor="white"
                    variant="contained"
                    disabled={!isValidEmail}
                    sx={{ mt: 3, mb: 2, width: '100%', fontWeight: 'bold' }}
                  >
                    Log In
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        sx={{ padding: 4 }}
        open={betaDialogOpen}
        onClose={handleBetaDialogClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography variant="h4" component="h4">
            Hi! We&apos;re in closed beta.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {!betaApplySuccess && (
            <React.Fragment>
              <Typography sx={{ mt: 2 }}>
                Thanks for checking us out. We are currently in a limited closed beta. If you would like to participate
                please click &quot;Apply for closed beta&quot; below. You will receive an email if you are accepted into
                our closed beta. If you are not accepted, we will still notify you when we enter open beta.
              </Typography>
              <LoadingButton
                loading={betaApplyLoading}
                onClick={handleApplyBeta}
                disabled={!isValidEmail}
                sx={{
                  marginTop: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  width: '100%',
                  background: '-webkit-linear-gradient(right, #259DFE, #8C49FB)',
                }}
              >
                Apply for closed beta
              </LoadingButton>
            </React.Fragment>
          )}
          {betaApplySuccess && (
            <React.Fragment>
              <Typography sx={{ mt: 2 }}>
                Thanks for applying to our closed beta! You&apos;ll hear from us soon.
              </Typography>
            </React.Fragment>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
