import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { useAuthContext } from '@/contexts/AuthContext';

export const AccountProfile = () => {
  const { user } = useAuthContext();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography color='textPrimary' gutterBottom variant='h5'>
            {user.fullName}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {`${user.city}/${user.state} - ${user.country}`}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {user.phone}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {user.birthday}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
