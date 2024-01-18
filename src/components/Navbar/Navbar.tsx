import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@icari-io/ui-components';
import { AppBar, Box, Container, Stack, Toolbar, useMediaQuery, useTheme, Link as MuiLink, styled, Typography, Alert, AlertTitle } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import icariLogo from 'src/assets/images/icari-logo-white-full.png';
import Image from 'next/image';
import { useWeb3Auth } from 'src/services/auth';
import React from 'react';
import NavbarAvatar from './NavbarAvatar';
import LoadingButton from '@mui/lab/LoadingButton';

const NavbarLink = styled(MuiLink)({
  fontWeight: 500,
  fontSize: 18
});

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Navbar({ changeTheme }: any) {
  const router = useRouter();
  const { user, isLoading } = useWeb3Auth();
  const [hidden, setHidden] = useState(false);
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const navColor = trigger ? (theme.palette.mode === 'dark' ? 'black' : '#f5f5f5') : 'transparent';

  function loginRedirect() {
    const url = router.asPath;
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!publicPaths.includes(path)) {
      router.push({
        pathname: '/login',
        query: { returnUrl: url },
      });
    }
  }

  useEffect(() => {
    const hiddenNavPaths = ['/login'];
    const path = router.asPath.split('?')[0];

    if (hiddenNavPaths.includes(path)) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [router.asPath]);

  const Nav = (
    <ElevationScroll>
      <AppBar position="fixed" sx={{ background: navColor, py: 1 }} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              <Stack direction="row" spacing={4} alignItems="center">
                <Image src={icariLogo} alt="icari logo" width={170} height={60} />
                <Link href="/" passHref>
                  <NavbarLink underline="none">
                    Store
                  </NavbarLink>
                </Link>
                <Link href="/support" passHref>
                  <NavbarLink underline="none">
                    Support
                  </NavbarLink>
                </Link>
                <Link href="/about" passHref>
                  <NavbarLink underline="none">
                    About
                  </NavbarLink>
                </Link>
                <Box display={matchDownMD ? 'none' : 'block'}>
                  <Button colorType="gradient" textColor="white" href='https://storage.googleapis.com/icari-misc/icari-launcher-win32-x64.zip'>
                    Download icari client
                  </Button>
                </Box>
              </Stack>
              <Box>
                {!user ? (
                  <LoadingButton
                    loading={isLoading}
                    onClick={loginRedirect}
                    sx={{
                      fontWeight: 'bold',
                      color: 'white',
                      width: '100px',
                      background: '-webkit-linear-gradient(right, #259DFE, #8C49FB)'
                    }}
                  >
                    Log In
                  </LoadingButton>
                ) : (
                  <NavbarAvatar changeTheme={changeTheme} />
                )}
              </Box>
            </Stack>
          </Toolbar>
        </Container>
        <Alert variant="filled" severity="info" sx={{ mt: 1 }}>
          Hi! This is a closed beta, and are not offering refunds on purchases (for now).
          Please read our <Link href="/refund_policy"><MuiLink sx={{cursor:"pointer"}}>refund policy</MuiLink></Link> for more information.
        </Alert>
      </AppBar>
    </ElevationScroll>
  );

  return !hidden ? Nav : <></>;
}
