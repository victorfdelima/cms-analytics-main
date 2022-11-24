import { ChangeEvent, MouseEvent, useState } from 'react';

import {
  // ModeEdit as ModeEditIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import { User } from '@/types/user';
import { useRouter } from 'next/router';

import { getInitials } from '../../utils/get-initials';

interface UserListResultsProps {
  users: User[];
  searchBy?: string;
}

export const UserListResults = ({
  users,
  searchBy = '',
}: UserListResultsProps) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const filteredUsers = users?.filter(user => {
    return user.fullName.toLowerCase().includes(searchBy.toLowerCase());
  });

  return (
    <Card>
      <Box
        sx={{
          overflowX: 'auto',
        }}
      >
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Tipo de usuário</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map(user => (
                <TableRow hover key={user.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Avatar sx={{ mr: 2 }}>
                        {getInitials(user.fullName)}
                      </Avatar>
                      <Typography color='textPrimary' variant='body1'>
                        {user.fullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.phone ? user.phone : 'Não informado'}
                  </TableCell>
                  <TableCell>
                    {user.userType === 'ADMIN' ? 'Administrador' : 'Usuário'}
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      {/* <IconButton
                        aria-label='edit'
                        title='Editar'
                        color='primary'
                        onClick={() => router.push(`/users/${user.id}/edit`)}
                      >
                        <ModeEditIcon />
                      </IconButton> */}

                      <IconButton
                        aria-label='view'
                        title='Visualizar'
                        onClick={() => router.push(`/users/${user.id}/`)}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <TablePagination
        component='div'
        count={filteredUsers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
