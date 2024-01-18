import { Link as MuiLink, Grid, Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@icari-io/ui-components';

export default function Footer() {
  const [tosDialogOpen, setTosDialogOpen] = React.useState(false);

  return (
    <Box
      mt={2}
      p={2}
      sx={{
        backgroundColor: 'secondary.main',
      }}
    >
      <Dialog
        open={tosDialogOpen}
        onClose={() => setTosDialogOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms of Service</DialogTitle>
        <DialogContent dividers>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTosDialogOpen(false)}
              sx={{
                color: 'white',
                background: '-webkit-linear-gradient(right, #259DFE, #8C49FB)'
              }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2} alignItems="center" justifyContent="space-around">
        <Grid item>
          © {new Date().getFullYear()} icari. All rights reserved.
        </Grid>
        <Grid item container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Link href="/about" passHref>
              <MuiLink underline="none">
                About Us
              </MuiLink>
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://discord.gg/K74hGhuK7J" target="_blank" passHref>
              <MuiLink underline="none">
                Our Discord
              </MuiLink>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/terms_of_service" passHref>
              Terms of Service
            </Link>
          </Grid>
          <Grid item>
            <Link href="/privacy_policy" passHref>
              Privacy Policy
            </Link>
          </Grid>
          <Grid item>
            <Link href="/refund_policy" passHref>
              Refund Policy
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
