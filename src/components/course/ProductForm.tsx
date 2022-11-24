import { useFormContext, useFieldArray } from 'react-hook-form';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { CourseFormValues } from '@/types/course';

export const ProductForm = ({ classIndex }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CourseFormValues>();
  const { fields, remove, append } = useFieldArray<CourseFormValues>({
    control,
    name: `classes.${classIndex}.product` as const,
  });

  const handleAddProduct = () => {
    append({ title: '', link: '', coverImage: '' });
  };

  return (
    <>
      {fields.map((item, index) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: '#F3F4F6' }}
          >
            <Typography>Produto {index + 1}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                my: 3,
              }}
            >
              <Stack direction='row' spacing={2}>
                <TextField
                  label='Nome do produto'
                  variant='outlined'
                  fullWidth
                  helperText={
                    errors?.classes?.[classIndex]?.product?.[index]?.title
                      ?.message
                  }
                  error={Boolean(
                    errors?.classes?.[classIndex]?.product?.[index]?.title
                  )}
                  {...register(
                    `classes.${classIndex}.product.${index}.title` as const
                  )}
                />

                <TextField
                  label='Link da imagem'
                  variant='outlined'
                  fullWidth
                  helperText={
                    errors?.classes?.[classIndex]?.product?.[index]?.coverImage
                      ?.message
                  }
                  error={Boolean(
                    errors?.classes?.[classIndex]?.product?.[index]?.coverImage
                  )}
                  {...register(
                    `classes.${classIndex}.product.${index}.coverImage` as const
                  )}
                />
              </Stack>

              <TextField
                label='Link do produto'
                variant='outlined'
                fullWidth
                helperText={
                  errors?.classes?.[classIndex]?.product?.[index]?.link?.message
                }
                error={Boolean(
                  errors?.classes?.[classIndex]?.product?.[index]?.link
                )}
                {...register(
                  `classes.${classIndex}.product.${index}.link` as const
                )}
              />
            </Box>

            <Button
              variant='contained'
              color='error'
              onClick={() => remove(index)}
            >
              Remover produto
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
        <Button variant='contained' color='primary' onClick={handleAddProduct}>
          Adicionar produto
        </Button>
      </Box>
    </>
  );
};
