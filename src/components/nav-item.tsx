import { Box, Button, ListItem } from '@mui/material';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const NavItem = ({
  href,
  icon,
  title,
  ...others
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <Button
          component='a'
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'secondary.main' : '#D1D5DB',
            fontWeight: active && '900',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : '#9CA3AF',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
