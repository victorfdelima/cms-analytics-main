import { useEffect, useState } from 'react';
import {
  useFormContext,
  useFieldArray,
  FormProvider,
  Controller,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import api from '@/services/api';
import { CourseFormValues } from '@/types/course';
import { Instructor } from '@/types/instructor';
import { COURSE_STATUS_TYPE, MOCKED_COURSE_TYPES } from '@/utils/constants';

import { ImageUpload } from '../ImageUpload';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { ProductForm } from './ProductForm';
import { QuizForm } from './QuizForm';

export const CourseForm = ({
  courseImageURL = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  classes = [],
}) => {
  const [instructorOptions, setInstructorOptions] = useState<Instructor[]>([]);

  useEffect(() => {
    const loadInstructorOptions = async () => {
      try {
        const response = await api.get('/instructor/all', {
          params: {
            page: 0,
            size: 100,
          },
        });

        setInstructorOptions(response.data.instructors);
      } catch (error) {
        toast.error('Erro ao carregar instrutores!');
        console.log(error);
      }
    };

    loadInstructorOptions();
  }, []);

  const methods = useFormContext<CourseFormValues>();

  const classesMethods = useFieldArray<CourseFormValues>({
    name: 'classes',
    control: methods.control,
  });

  const faqMethods = useFieldArray<CourseFormValues>({
    name: 'faq',
    control: methods.control,
  });

  const handleAddClass = () => {
    classesMethods.append({
      title: '',
      description: '',
      coverImage: '',
      product: [],
      duration: '',
      videoUUID: '',
    });
  };

  const handleAddFAQQuestion = () => {
    faqMethods.append({ title: '', faqText: '' });
  };

  return (
    <FormProvider {...methods}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: '#F3F4F6' }}
        >
          <Typography>Informações</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <ImageUpload defaultURL={courseImageURL} name='coverImage' />
            </Box>

            <Stack direction='row' spacing={2} sx={{ my: 3 }}>
              <TextField
                label='Nome do Curso'
                variant='outlined'
                fullWidth
                helperText={methods.formState.errors?.title?.message}
                error={Boolean(methods.formState.errors?.title)}
                {...methods.register('title')}
              />

              <FormControl
                fullWidth
                error={Boolean(methods.formState.errors?.courseStatusType)}
              >
                <InputLabel id='courseStatusType'>Status</InputLabel>
                <Controller
                  control={methods.control}
                  name='courseStatusType'
                  render={({ field }) => (
                    <>
                      <Select
                        labelId='courseStatusType'
                        label='Status'
                        value={field.value}
                        onChange={field.onChange}
                        {...field}
                      >
                        <MenuItem value=''>Selecione um status</MenuItem>
                        {COURSE_STATUS_TYPE.map(courseStatusType => (
                          <MenuItem
                            key={courseStatusType.value}
                            value={courseStatusType.value}
                          >
                            {courseStatusType.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {Boolean(methods.formState.errors?.courseStatusType) && (
                        <FormHelperText>
                          {methods.formState.errors?.courseStatusType?.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Stack>

            <Stack direction='row' spacing={2} sx={{ my: 3 }}>
              <TextField
                label='Categoria'
                variant='outlined'
                fullWidth
                helperText={methods.formState.errors?.category?.message}
                error={Boolean(methods.formState.errors?.category)}
                {...methods.register('category')}
              />

              <TextField
                label='Duração'
                variant='outlined'
                fullWidth
                helperText={methods.formState.errors?.duration?.message}
                error={Boolean(methods.formState.errors?.duration)}
                {...methods.register('duration')}
              />
            </Stack>

            <Stack direction='row' spacing={2} sx={{ my: 3 }}>
              <FormControl
                fullWidth
                error={Boolean(methods.formState.errors?.courseType)}
              >
                <InputLabel id='courseType'>Tipo</InputLabel>
                <Controller
                  control={methods.control}
                  name='courseType'
                  render={({ field }) => (
                    <>
                      <Select
                        labelId='courseType'
                        label='Tipo'
                        value={field.value}
                        onChange={field.onChange}
                        {...field}
                      >
                        <MenuItem value=''>Selecione um tipo</MenuItem>
                        {MOCKED_COURSE_TYPES.map(courseType => (
                          <MenuItem key={courseType} value={courseType}>
                            {courseType}
                          </MenuItem>
                        ))}
                      </Select>
                      {Boolean(methods.formState.errors?.courseType) && (
                        <FormHelperText>
                          {methods.formState.errors?.courseType?.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(methods.formState.errors?.instructorId)}
              >
                <InputLabel id='instructorId'>Instrutor</InputLabel>
                <Controller
                  control={methods.control}
                  name='instructorId'
                  render={({ field }) => (
                    <>
                      <Select
                        labelId='instructorId'
                        label='Instrutor'
                        value={field.value}
                        onChange={field.onChange}
                        {...field}
                      >
                        <MenuItem value=''>Selecione um instrutor</MenuItem>
                        {instructorOptions.map(instructor => (
                          <MenuItem key={instructor.id} value={instructor.id}>
                            {instructor.fullName}
                          </MenuItem>
                        ))}
                      </Select>

                      {Boolean(methods.formState.errors?.instructorId) && (
                        <FormHelperText>
                          {methods.formState.errors?.instructorId?.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Stack>

            <Controller
              render={({ field }) => (
                <WYSIWYGEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(methods.formState.errors?.description)}
                />
              )}
              name='description'
              control={methods.control}
            />

            <Box sx={{ my: 3 }}>
              <Typography>O que você vai aprender</Typography>

              <TextField
                label='Aprendizado 1'
                variant='outlined'
                fullWidth
                sx={{ my: 1 }}
                helperText={
                  methods.formState.errors?.apprenticeshipList?.[0]?.message
                }
                error={Boolean(
                  methods.formState.errors?.apprenticeshipList?.[0]
                )}
                {...methods.register(`apprenticeshipList.${0}` as const)}
              />

              <TextField
                label='Aprendizado 2'
                variant='outlined'
                fullWidth
                sx={{ my: 1 }}
                helperText={
                  methods.formState.errors?.apprenticeshipList?.[1]?.message
                }
                error={Boolean(
                  methods.formState.errors?.apprenticeshipList?.[1]
                )}
                {...methods.register(`apprenticeshipList.${1}` as const)}
              />

              <TextField
                label='Aprendizado 3'
                variant='outlined'
                fullWidth
                sx={{ my: 1 }}
                helperText={
                  methods.formState.errors?.apprenticeshipList?.[2]?.message
                }
                error={Boolean(
                  methods.formState.errors?.apprenticeshipList?.[2]
                )}
                {...methods.register(`apprenticeshipList.${2}` as const)}
              />
            </Box>
          </>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: '#F3F4F6' }}
        >
          <Typography>Aulas</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {classesMethods.fields.map((item, index) => (
            <Accordion key={item.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ background: '#F3F4F6' }}
              >
                <Typography>Aula {index + 1}</Typography>
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
                  {/* <Box
                    sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
                  >
                    <ImageUpload
                      defaultURL={classes[index]?.coverImage}
                      name={`classes.${index}.classImage` as const}
                    />
                  </Box> */}

                  <Stack direction='row' spacing={2}>
                    <TextField
                      label='Nome da Aula'
                      variant='outlined'
                      fullWidth
                      helperText={
                        methods.formState.errors?.classes?.[index]?.title
                          ?.message
                      }
                      error={Boolean(
                        methods.formState.errors?.classes?.[index]?.title
                      )}
                      {...methods.register(`classes.${index}.title` as const)}
                    />

                    <TextField
                      label='Link da imagem'
                      variant='outlined'
                      fullWidth
                      helperText={
                        methods.formState.errors?.classes?.[index]?.coverImage
                          ?.message
                      }
                      error={Boolean(
                        methods.formState.errors?.classes?.[index]?.coverImage
                      )}
                      {...methods.register(
                        `classes.${index}.coverImage` as const
                      )}
                    />
                  </Stack>
                  <Stack direction='row' spacing={2}>
                    <TextField
                      label='Duração'
                      variant='outlined'
                      fullWidth
                      helperText={
                        methods.formState.errors?.classes?.[index]?.duration
                          ?.message
                      }
                      error={Boolean(
                        methods.formState.errors?.classes?.[index]?.duration
                      )}
                      {...methods.register(
                        `classes.${index}.duration` as const
                      )}
                    />

                    <TextField
                      label='UUID do vídeo'
                      variant='outlined'
                      fullWidth
                      helperText={
                        methods.formState.errors?.classes?.[index]?.videoUUID
                          ?.message
                      }
                      error={Boolean(
                        methods.formState.errors?.classes?.[index]?.videoUUID
                      )}
                      {...methods.register(
                        `classes.${index}.videoUUID` as const
                      )}
                    />
                  </Stack>

                  <Controller
                    render={({ field, formState }) => (
                      <WYSIWYGEditor
                        value={field.value}
                        onChange={field.onChange}
                        error={Boolean(
                          formState.errors?.classes?.[index]?.description
                        )}
                      />
                    )}
                    name={`classes.${index}.description`}
                    control={methods.control}
                  />

                  <Box>
                    <Typography sx={{ mb: 3 }}>Produtos</Typography>

                    <ProductForm classIndex={index} />
                  </Box>
                </Box>

                <Button
                  variant='contained'
                  color='error'
                  onClick={() => classesMethods.remove(index)}
                >
                  Remover aula
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              color='primary'
              variant='contained'
              onClick={handleAddClass}
            >
              Adicionar aula
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: '#F3F4F6' }}
        >
          <Typography>Quiz</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QuizForm />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: '#F3F4F6' }}
        >
          <Typography>FAQ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {faqMethods.fields.map((item, index) => (
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
                    helperText={
                      methods.formState.errors?.faq?.[index]?.title?.message
                    }
                    error={Boolean(
                      methods.formState.errors?.faq?.[index]?.title
                    )}
                    {...methods.register(`faq.${index}.title` as const)}
                  />

                  <TextField
                    label='Resposta'
                    variant='outlined'
                    fullWidth
                    helperText={
                      methods.formState.errors?.faq?.[index]?.faqText?.message
                    }
                    error={Boolean(
                      methods.formState.errors?.faq?.[index]?.faqText
                    )}
                    {...methods.register(`faq.${index}.faqText` as const)}
                  />
                </Box>

                <Button
                  variant='contained'
                  color='error'
                  onClick={() => faqMethods.remove(index)}
                >
                  Remover pergunta
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              color='primary'
              variant='contained'
              onClick={handleAddFAQQuestion}
            >
              Adicionar pergunta
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </FormProvider>
  );
};
