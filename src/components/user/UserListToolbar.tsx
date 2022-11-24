import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Select,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

import { useRouter } from 'next/router';

interface UserListToolbarProps {
  onSearchChange: (value: string) => void;
  user: string;
  onChange: (value: string) => void;
}

export const UserListToolbar = ({
  onSearchChange,
  user,
  onChange,
}: UserListToolbarProps) => {
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
          Usuários
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => router.push('/users/create')}
            startIcon={<AddIcon />}
          >
            Adicionar Usuário
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Stack direction='row' spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder='Procurar Usuário'
                variant='outlined'
                onChange={event => onSearchChange(event.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id='user-type-label'>Tipo</InputLabel>
                <Select
                  labelId='user-type-label'
                  id='user-type-id'
                  label='Tipo'
                  value={user}
                  onChange={event => onChange(event.target.value)}
                >
                  <MenuItem value='CONSUMER'>Usuário</MenuItem>
                  <MenuItem value='ADMIN'>Administrador</MenuItem>
                  <MenuItem value='EMPLOYEE'>Funcionário</MenuItem>
                  <MenuItem value='PREMIUM'>Premium</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
