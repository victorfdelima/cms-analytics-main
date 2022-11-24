import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button, Card, CardHeader, Divider } from '@mui/material';

export const Sales = props => {
  return (
    <Card {...props}>
      <CardHeader title='Last 7 days' />

      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color='primary'
          endIcon={<ArrowRightIcon fontSize='small' />}
          size='small'
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
