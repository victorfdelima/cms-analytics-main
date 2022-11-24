import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { AvatarUpload } from '../AvatarUpload';

interface InstructorFormProps {
  avatarDefaultURL?: string;
}

export const InstructorForm = ({
  avatarDefaultURL = '',
}: InstructorFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AvatarUpload defaultURL={avatarDefaultURL} />
      </Box>

      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <TextField
          label='Nome completo'
          variant='outlined'
          fullWidth
          error={Boolean(errors?.fullName)}
          {...register('fullName')}
        />

        <TextField
          label='Assuntos abordados'
          variant='outlined'
          fullWidth
          helperText='Separe os assuntos por vírgula'
          error={Boolean(errors?.teachingList)}
          {...register('teachingList')}
        />
      </Stack>

      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <TextField
          label='Facebook'
          variant='outlined'
          placeholder='https://www.facebook.com/example'
          fullWidth
          error={Boolean(errors?.facebook)}
          {...register('facebook')}
        />

        <TextField
          label='Instagram'
          variant='outlined'
          placeholder='https://www.instagram.com/example'
          fullWidth
          error={Boolean(errors?.instagram)}
          {...register('instagram')}
        />
      </Stack>

      <TextField
        label='Breve descrição'
        variant='outlined'
        fullWidth
        error={Boolean(errors?.shortDescription)}
        {...register('shortDescription')}
        sx={{ mb: 3 }}
      />

      <TextField
        label='Descrição'
        variant='outlined'
        fullWidth
        multiline
        rows={5}
        error={Boolean(errors?.description)}
        {...register('description')}
      />
    </>
  );
};
