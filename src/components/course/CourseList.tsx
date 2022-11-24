import { ChangeEvent, MouseEvent } from 'react';

import {
  ModeEdit as ModeEditIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Stack } from '@mui/system';

import { Course } from '@/types/course';
import { useRouter } from 'next/router';

interface CourseListProps {
  courses: Course[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const CourseList = ({
  courses,
  page,
  setPage,
  limit,
  setLimit,
}: CourseListProps) => {
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
                <TableCell>Aulas</TableCell>
                <TableCell>Duração</TableCell>
                <TableCell>Instrutor</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.map(course => (
                <TableRow hover key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.classes.length}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.instructorId}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        aria-label='edit'
                        title='Editar'
                        onClick={() =>
                          router.push(`/courses/${course.id}/edit`)
                        }
                      >
                        <ModeEditIcon />
                      </IconButton>

                      <IconButton
                        aria-label='view'
                        title='Visualizar'
                        onClick={() => router.push(`/courses/${course.id}/`)}
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
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
