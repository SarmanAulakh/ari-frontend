import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Paper,
  Typography,
  ClickAwayListener,
  Popper,
  Card,
  CardContent,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLogout, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { useWeb3Auth } from 'src/services/auth';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import { Colors, Transitions } from '@icari-io/ui-components';

const AVATAR_WIDTH = 42;
const AVATAR_HEIGHT = 42;

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function NavbarAvatar({ changeTheme }: any) {
  const { logout, userDetails, setUserInfo } = useWeb3Auth();
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!userDetails) {
      setUserInfo();
    }
  }, []);

  return (
    <Box>
      <Button
        aria-label="open profile"
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" alignItems="center" spacing={2} ref={anchorRef}>
          <Avatar
            alt="todo"
            src={(userDetails as any)?.profileImage}
            sx={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }}
          />
          <Box display={matchDownMD ? 'none' : 'block'}>
            <Typography variant="subtitle1" textTransform="none">
              {(userDetails as any)?.name || (userDetails as any)?.email}
            </Typography>
          </Box>
        </Stack>
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  //boxShadow: theme.customShadows.z1,
                  width: 380,
                  minWidth: 280,
                  maxWidth: 380,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 300,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Card elevation={0}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar
                              alt="profile user"
                              src={(userDetails as any)?.profileImage}
                              sx={{ width: AVATAR_WIDTH * 2, height: AVATAR_HEIGHT * 2 }}
                            />
                            <Stack>
                              <Typography variant="h6">
                                {(userDetails as any)?.name || (userDetails as any)?.email}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                #Gamer
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={logout}>
                            <AiOutlineLogout color={Colors.PURPLE_BRIGHT} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize',
                              }}
                              icon={
                                <AiOutlineUser style={{ fontSize: '24px', marginBottom: 0, marginRight: '10px' }} />
                              }
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize',
                              }}
                              icon={
                                <AiOutlineSetting style={{ fontSize: '24px', marginBottom: 0, marginRight: '10px' }} />
                              }
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                          <ProfileTab handleLogout={logout} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <SettingTab changeTheme={changeTheme} />
                        </TabPanel>
                      </>
                    )}
                  </Card>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
