import { Grid, Paper, Typography, useTheme } from '@mui/material';
import { Tab, Tabs, TabPanel } from '@ari/ui-components';
import React, { useState } from 'react';

interface Requirements {
  [key: string]: string;
}

interface Props {
  windows?: {
    minimum: Requirements;
    recommended: Requirements;
  };
  macos?: {
    minimum: Requirements;
    recommended: Requirements;
  };
}

export default function SystemRequirements({ windows, macos }: Props) {
  const {
    palette: { mode, grey },
  } = useTheme();
  const darkMode = mode === 'dark';
  const greyValue = darkMode ? grey[400] : grey[800];

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={[
        {
          // height: 250,
          background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          mt: 4,
          p: 2,
        },
      ]}
    >
      <Typography variant="h5">System Requirements</Typography>
      <Tabs value={value} onChange={handleChange} aria-label="styled tabs example">
        <Tab label="Windows" index={0} />
        <Tab label="MacOS" index={1} />
      </Tabs>
      <TabPanel index={0} value={value} sx={{ p: 1 }}>
        {!windows ? (
          'Not Available'
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography mb={1} variant="h6" fontWeight={600}>
                Minimum
              </Typography>
              {Object.entries(windows?.minimum).map(([key, value]) => (
                <Typography color={greyValue} fontWeight={600} key={`windows ${key}`}>
                  {key}
                  {': '}
                  <Typography color="primary" display="inline">
                    {value}
                  </Typography>
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography mb={1} variant="h6" fontWeight={600}>
                Recommended
              </Typography>
              {Object.entries(windows?.recommended).map(([key, value]) => (
                <Typography color={greyValue} fontWeight={600} key={`windows ${key}`}>
                  {key}
                  {': '}
                  <Typography color="primary" display="inline">
                    {value}
                  </Typography>
                </Typography>
              ))}
            </Grid>
          </Grid>
        )}
      </TabPanel>
      <TabPanel index={1} value={value} sx={{ p: 1 }}>
        {!macos ? (
          'Not Available'
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography mb={1} variant="h6" fontWeight={600}>
                Minimum
              </Typography>
              {Object.entries(macos?.minimum).map(([key, value]) => (
                <Typography color={greyValue} fontWeight={600} key={`macos ${key}`}>
                  {key}
                  {': '}
                  <Typography color="primary" display="inline">
                    {value}
                  </Typography>
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography mb={1} variant="h6" fontWeight={600}>
                Recommended
              </Typography>
              {Object.entries(macos?.recommended).map(([key, value]) => (
                <Typography color={greyValue} fontWeight={600} key={`macos ${key}`}>
                  {key}
                  {': '}
                  <Typography color="primary" display="inline">
                    {value}
                  </Typography>
                </Typography>
              ))}
            </Grid>
          </Grid>
        )}
      </TabPanel>
    </Paper>
  );
}
