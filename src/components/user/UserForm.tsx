import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Stack } from '@mui/system';

import { UserFormValues } from '@/types/user';
import { stateList } from '@/utils/state-list';

interface UserFormProps {
  isEditing?: boolean;
}

export const UserForm = (
  { isEditing }: UserFormProps = { isEditing: false }
) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UserFormValues>();

  return (
    <>
      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <TextField
          label='Nome completo'
          variant='outlined'
          fullWidth
          helperText={errors.fullName?.message as string}
          error={Boolean(errors?.fullName)}
          {...register('fullName')}
        />

        <FormControl fullWidth>
          <InputLabel id='gender'>Gênero</InputLabel>

          <Controller
            control={control}
            name='gender'
            render={({ field, formState: { errors } }) => (
              <Select
                labelId='gender'
                label='Gênero'
                value={field.value}
                onChange={field.onChange}
                {...field}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.gender ? '#f44336' : '#ced4da',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.gender ? '#f44336' : '#80bdff',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.gender ? '#f44336' : '#80bdff',
                  },
                }}
              >
                <MenuItem value=''>Selecione um gênero</MenuItem>
                <MenuItem value='MALE'>Masculino</MenuItem>
                <MenuItem value='FEMALE'>Feminino</MenuItem>
                <MenuItem value='OTHER'>Outros</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Stack>

      <TextField
        label='Email'
        variant='outlined'
        fullWidth
        helperText={errors.email?.message as string}
        error={Boolean(errors?.email)}
        sx={{ mb: 3 }}
        {...register('email')}
      />

      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <Controller
          name='phone'
          control={control}
          render={({ field, formState: { errors } }) => (
            <InputMask
              mask='(99) 9999-9999'
              value={field.value}
              onChange={field.onChange}
              label='Telefone'
              helperText={errors?.phone?.message as string}
              error={Boolean(errors?.phone)}
            >
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField fullWidth {...inputProps} type='tel' />
                )
              }
            </InputMask>
          )}
        />

        <Controller
          name='birthday'
          control={control}
          render={({ field, formState: { errors } }) => (
            <InputMask
              mask='99/99/9999'
              value={field.value}
              onChange={field.onChange}
              label='Data de nascimento'
              helperText={errors?.birthday?.message as string}
              error={Boolean(errors?.birthday)}
            >
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField fullWidth {...inputProps} />
                )
              }
            </InputMask>
          )}
        />
      </Stack>

      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id='state'>Estado</InputLabel>
          <Controller
            control={control}
            name='state'
            render={({ field, formState: { errors } }) => (
              <Select
                labelId='state'
                label='Estado'
                value={field.value}
                onChange={field.onChange}
                {...field}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.state ? '#f44336' : '#ced4da',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.state ? '#f44336' : '#80bdff',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors?.state ? '#f44336' : '#80bdff',
                  },
                }}
              >
                <MenuItem value=''>Selecione um estado</MenuItem>
                {stateList.map(state => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <TextField
          label='Cidade'
          variant='outlined'
          fullWidth
          helperText={errors.city?.message as string}
          error={Boolean(errors?.city)}
          {...register('city')}
          sx={{ mb: 3 }}
        />
      </Stack>

      {!isEditing && (
        <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
          <TextField
            label='Senha'
            variant='outlined'
            type='password'
            fullWidth
            helperText={errors.password?.message as string}
            error={Boolean(errors?.password)}
            {...register('password')}
          />

          <TextField
            label='Confirme sua senha'
            variant='outlined'
            type='password'
            fullWidth
            helperText={errors.password_confirmation?.message as string}
            error={Boolean(errors?.password_confirmation)}
            {...register('password_confirmation')}
            sx={{ mb: 3 }}
          />
        </Stack>
      )}
    </>
  );
};
