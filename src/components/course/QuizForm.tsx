import { useFormContext, useFieldArray } from 'react-hook-form';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  // Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CourseFormValues } from '@/types/course';

export const QuizForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CourseFormValues>();

  const { fields, remove, append } = useFieldArray<CourseFormValues>({
    control,
    name: `quiz.questions`,
  });

  const handleAddQuestion = () => {
    append({ name: '', answer: { answerText: '' } });
  };

  return (
    <>
      <TextField
        label='Texto de introdução do quiz'
        variant='outlined'
        fullWidth
        multiline
        rows={5}
        helperText={errors?.quiz?.title?.message}
        error={Boolean(errors?.quiz?.title)}
        sx={{ my: 3 }}
        {...register('quiz.title')}
      />

      {fields.map((item, index) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: '#F3F4F6' }}
          >
            <Typography>Pergunta {index + 1}</Typography>
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
              <TextField
                label='Pergunta'
                variant='outlined'
                fullWidth
                helperText={errors?.quiz?.questions?.[index]?.name?.message}
                error={Boolean(errors?.quiz?.questions?.[index]?.name)}
                {...register(`quiz.questions.${index}.name` as const)}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Respostas</Typography>

                <Typography variant='h6'>É a correta?</Typography>
              </Box>

              <Stack direction='row' spacing={2}>
                <TextField
                  label='Alternativa 1'
                  variant='outlined'
                  fullWidth
                  helperText={
                    // errors?.quiz?.questions?.[index]?.answer?.[0]?.answerText
                    errors?.quiz?.questions?.[index]?.answer?.answerText
                      ?.message
                  }
                  error={Boolean(
                    errors?.quiz?.questions?.[index]?.answer?.answerText
                    // errors?.quiz?.questions?.[index]?.answer?.[0]?.answerText
                  )}
                  {...register(
                    `quiz.questions.${index}.answer.answerText` as const
                  )}
                />

                {/* <Checkbox
                  sx={{ width: 60 }}
                  {...register(
                    `quiz.questions[${index}].answer.isCorrect`
                  )}
                /> */}
              </Stack>

              {/* <Stack direction='row' spacing={2}>
                <TextField
                  label='Alternativa 2'
                  variant='outlined'
                  fullWidth
                  error={Boolean(
                    errors?.quiz?.questions?.[index]?.answer?.[1]?.answerText
                  )}
                  {...register(
                    `quiz.questions[${index}].answer.[${1}].answerText`
                  )}
                />

                <Checkbox
                  sx={{ width: 60 }}
                  {...register(
                    `quiz.questions[${index}].answer.[${1}].isCorrect`
                  )}
                />
              </Stack>

              <Stack direction='row' spacing={2}>
                <TextField
                  label='Alternativa 3'
                  variant='outlined'
                  fullWidth
                  error={Boolean(
                    errors?.quiz?.questions?.[index]?.answer?.[2]?.answerText
                  )}
                  {...register(
                    `quiz.questions[${index}].answer.[${2}].answerText`
                  )}
                />

                <Checkbox
                  sx={{ width: 60 }}
                  {...register(
                    `quiz.questions[${index}].answer.[${2}].isCorrect`
                  )}
                />
              </Stack>

              <Stack direction='row' spacing={2}>
                <TextField
                  label='Alternativa 4'
                  variant='outlined'
                  fullWidth
                  error={Boolean(
                    errors?.quiz?.questions?.[index]?.answer?.[3]?.answerText
                  )}
                  {...register(
                    `quiz.questions[${index}].answer.[${3}].answerText`
                  )}
                />

                <Checkbox
                  sx={{ width: 60 }}
                  {...register(
                    `quiz.questions[${index}].answer.[${3}].isCorrect`
                  )}
                />
              </Stack>

              <Stack direction='row' spacing={2}>
                <TextField
                  label='Alternativa 15'
                  variant='outlined'
                  fullWidth
                  error={Boolean(
                    errors?.quiz?.questions?.[index]?.answer?.[4]?.answerText
                  )}
                  {...register(
                    `quiz.questions[${index}].answer.[${4}].answerText`
                  )}
                />

                <Checkbox
                  sx={{ width: 60 }}
                  {...register(
                    `quiz.questions[${index}].answer.[${4}].isCorrect`
                  )}
                />
              </Stack> */}
            </Box>

            <Button
              variant='contained'
              color='error'
              onClick={() => remove(index)}
            >
              Remover pergunta
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
        <Button variant='contained' color='primary' onClick={handleAddQuestion}>
          Adicionar pergunta
        </Button>
      </Box>
    </>
  );
};
