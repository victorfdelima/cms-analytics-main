import { MenuItem, MenuList, Popover } from '@mui/material';

import { useAuthContext } from '@/contexts/AuthContext';
import Router from 'next/router';
import PropTypes from 'prop-types';

export const AccountPopover = props => {
  const { anchorEl, onClose, open, ...other } = props;
  const { signOut } = useAuthContext();

  const handleSignOut = async () => {
    onClose?.();
    try {
      signOut();
      Router.push('/login').catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={() => Router.push('/account')}>Perfil</MenuItem>
        <MenuItem onClick={handleSignOut}>Sair</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
