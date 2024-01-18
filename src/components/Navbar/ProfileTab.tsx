import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AiOutlineLogout, AiOutlineWallet } from 'react-icons/ai';
import { RiUserSettingsLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const ProfileTab = ({ handleLogout }: any) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton onClick={() => router.push('/account')}>
        <ListItemIcon>
          <RiUserSettingsLine />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      {/* <ListItemButton onClick={() => router.push('/wallet')}>
                <ListItemIcon>
                    <AiOutlineWallet />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
            </ListItemButton> */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <AiOutlineLogout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
