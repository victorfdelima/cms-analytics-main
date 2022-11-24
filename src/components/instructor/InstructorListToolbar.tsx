import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/router';

interface InstructorListToolbarProps {
  onSearchChange: (value: string) => void;
}

export const InstructorListToolbar = ({
  onSearchChange,
}: InstructorListToolbarProps) => {
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
          Instrutores
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => router.push('/instructors/create')}
            startIcon={<AddIcon />}
          >
            Adicionar instrutor
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder='Procurar instrutor'
                variant='outlined'
                onChange={event => onSearchChange(event.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
