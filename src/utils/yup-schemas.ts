import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, array, ref } from 'yup';

const yupShapeWithResolver = shape => yupResolver(object().shape(shape));

export const instructorResolver = yupShapeWithResolver({
  fullName: string()
    .required('Nome completo é obrigatório')
    .min(4, 'Mínimo de 4 caracteres')
    .max(30, 'Máximo de 30 caracteres'),
  shortDescription: string()
    .required('Descrição abreviada é obrigatória')
    .min(4, 'Mínimo de 4 caracteres')
    .max(160, 'Máximo de 160 caracteres'),
  description: string()
    .required('Descrição é obrigatória')
    .min(20, 'Mínimo de 20 caracteres')
    .max(1000, 'Máximo de 1000 caracteres'),
  teachingList: string().required('Assuntos abordados são obrigatórios'),
  facebook: string().url('Facebook precisa ser uma URL válida'),
  instagram: string().url('Instagram precisa ser uma URL válida'),
});

export const createUserResolver = yupShapeWithResolver({
  email: string().required('Email é obrigatório'),
  fullName: string().required('Nome completo é obrigatório'),
  password: string().required('Senha é obrigatória'),
  password_confirmation: string()
    .required('Senha é obrigatória')
    .oneOf([ref('password')], 'Senhas não conferem'),
  phone: string().required('Telefone é obrigatório'),
  city: string().required('Cidade é obrigatória'),
  state: string().required('Estado é obrigatório'),
  gender: string().required('Gênero é obrigatório'),
  birthday: string().required('Data de nascimento é obrigatória'),
});

export const loginResolver = yupShapeWithResolver({
  email: string().required('Email é obrigatório'),
  password: string().required('Senha é obrigatória'),
});

export const courseResolver = yupShapeWithResolver({
  title: string()
    .required('Nome é obrigatório')
    .min(4, 'Mínimo de 4 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  description: string()
    .required('Descrição é obrigatória')
    .min(4, 'Mínimo de 4 caracteres')
    .max(160, 'Máximo de 160 caracteres'),
  category: string()
    .required('Categoria é obrigatória')
    .min(4, 'Mínimo de 4 caracteres')
    .max(20, 'Máximo de 20 caracteres'),
  duration: string()
    .required('Duração é obrigatória')
    .min(4, 'Mínimo de 4 caracteres')
    .max(10, 'Máximo de 10 caracteres'),
  courseType: string().required('Tipo de curso é obrigatório'),
  courseStatusType: string().required('Status do curso é obrigatório'),
  instructorId: string().required('Instrutor(a) é obrigatório(a)'),
  apprenticeshipList: array(string().required('Aprendizado é obrigatório')),
  faq: array(
    object({
      title: string()
        .required('Pergunta é obrigatória')
        .min(4, 'Mínimo de 4 caracteres')
        .max(50, 'Máximo de 50 caracteres'),
      faqText: string()
        .required('Resposta é obrigatória')
        .min(4, 'Mínimo de 4 caracteres')
        .max(120, 'Máximo de 120 caracteres'),
    })
  ),
  classes: array(
    object({
      title: string()
        .required('Nome da aula é obrigatória')
        .min(4, 'Mínimo de 4 caracteres')
        .max(30, 'Máximo de 30 caracteres'),
      duration: string()
        .required('Duração é obrigatória')
        .min(4, 'Mínimo de 4 caracteres')
        .max(10, 'Máximo de 10 caracteres'),
      description: string()
        .required('Descrição da aula é obrigatória')
        .max(500, 'Máximo de 500 caracteres'),
      // TODO remover coverImage quando começar a subir imagem
      coverImage: string()
        .required('Imagem de capa da aula é obrigatória')
        .min(4, 'Mínimo de 4 caracteres')
        .max(256, 'Máximo de 256 caracteres'),
      videoUUID: string()
        .required('UUID do vídeo é obrigatório')
        .uuid('É preciso ser um UUID válido'),
      product: array(
        object({
          title: string()
            .required('Nome do produto é obrigatório')
            .min(4, 'Mínimo de 4 caracteres')
            .max(50, 'Máximo de 50 caracteres'),
          coverImage: string()
            .required('Imagem de capa do produto é obrigatória')
            .min(4, 'Mínimo de 4 caracteres')
            .max(256, 'Máximo de 256 caracteres'),
          link: string()
            .required('Link do produto é obrigatório')
            .url('Link precisa ser uma URL válida')
            .min(4, 'Mínimo de 4 caracteres')
            .max(256, 'Máximo de 256 caracteres'),
        })
      ),
    })
  ),
  quiz: object({
    title: string()
      .required('Nome do quiz é obrigatório')
      .min(4, 'Mínimo de 4 caracteres')
      .max(50, 'Máximo de 50 caracteres'),
    questions: array(
      object({
        name: string()
          .required('Nome da questão é obrigatório')
          .min(4, 'Mínimo de 4 caracteres')
          .max(50, 'Máximo de 50 caracteres'),
        // answer: array(
        //   object({
        //     answerText: string()
        //       .required('Resposta é obrigatória')
        //       .min(1, 'Mínimo de 1 carácter')
        //       .max(120, 'Máximo de 120 caracteres'),
        //     isCorrect: boolean().required('Resposta correta é obrigatória'),
        //   })
        // ),
        answer: object({
          answerText: string()
            .required('Resposta é obrigatória')
            .min(1, 'Mínimo de 1 carácter')
            .max(120, 'Máximo de 120 caracteres'),
          // isCorrect: boolean().required('Resposta correta é obrigatória'),
        }),
      })
    ),
  }),
});
