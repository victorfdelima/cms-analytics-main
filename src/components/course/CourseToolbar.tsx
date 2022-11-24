import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { useRouter } from 'next/router';

export const CourseToolbar = () => {
  const router = useRouter();

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant='h4'>
          Cursos
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => router.push('/courses/create')}
            startIcon={<AddIcon />}
          >
            Adicionar curso
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
