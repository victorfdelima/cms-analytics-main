import { ChangeEvent, MouseEvent } from 'react';

import {
  ModeEdit as ModeEditIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  // Avatar,
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

import { Instructor } from '@/types/instructor';
import { useRouter } from 'next/router';

// import { getInitials } from '../../utils/get-initials';

interface InstructorListResultsProps {
  instructors: Instructor[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  searchBy?: string;
}

export const InstructorListResults = ({
  instructors,
  page,
  setPage,
  limit,
  setLimit,
  searchBy = '',
}: InstructorListResultsProps) => {
  const router = useRouter();

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const filteredInstructors = instructors?.filter(instructor => {
    return instructor.fullName.toLowerCase().includes(searchBy.toLowerCase());
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
                <TableCell>O que ensina</TableCell>
                <TableCell>Facebook</TableCell>
                <TableCell>Instagram</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredInstructors.map(instructor => (
                <TableRow hover key={instructor.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {/* <Avatar src={instructor.profileImage} sx={{ mr: 2 }}>
                        {getInitials(instructor.fullName)}
                      </Avatar> */}
                      <Typography color='textPrimary' variant='body1'>
                        {instructor.fullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {instructor.teachingList.reduce(
                      (prev, curr, idx) =>
                        idx !== 0 ? `${prev}, ${curr}` : curr,
                      ''
                    )}
                  </TableCell>
                  <TableCell>{instructor.sso?.FACEBOOK}</TableCell>
                  <TableCell>{instructor.sso?.INSTAGRAM}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        aria-label='edit'
                        title='Editar'
                        onClick={() =>
                          router.push(`/instructors/${instructor.id}/edit`)
                        }
                      >
                        <ModeEditIcon />
                      </IconButton>

                      <IconButton
                        aria-label='view'
                        title='Visualizar'
                        onClick={() =>
                          router.push(`/instructors/${instructor.id}/`)
                        }
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
        count={filteredInstructors.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
