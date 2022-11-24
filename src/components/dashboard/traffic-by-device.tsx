import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

export const TrafficByDevice = props => {
  const devices = [
    {
      title: 'Desktop',
      value: 63,
      icon: LaptopMacIcon,
      color: '#3F51B5',
    },
    {
      title: 'Tablet',
      value: 15,
      icon: TabletIcon,
      color: '#E53935',
    },
    {
      title: 'Mobile',
      value: 23,
      icon: PhoneIcon,
      color: '#FB8C00',
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title='Traffic by Device' />
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}
            >
              <Icon color='action' />
              <Typography color='textPrimary' variant='body1'>
                {title}
              </Typography>
              <Typography style={{ color }} variant='h4'>
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
