import { FC, useRef, useState } from 'react';

import { AppBarProps, Avatar } from '@mui/material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAuthContext } from '@/contexts/AuthContext';
import { Menu as MenuIcon } from '@/icons/menu';
import { getInitials } from '@/utils/get-initials';

import { AccountPopover } from './account-popover';

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'dark'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

export const DashboardNavbar: FC<DashboardNavbarProps> = props => {
  const { onOpenSidebar, ...other } = props;
  const { user } = useAuthContext()

  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>

          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1,
            }}
            src='/static/images/avatars/avatar_1.png'
          >
            {getInitials(user?.fullName)}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>

      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};
