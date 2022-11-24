import { toast } from 'react-toastify';

import api from './api';
import { EntityType, getImage, uploadImage } from './image';

export const getAllCourses = async (size = 12, page = 0) => {
  return  api.get('/course/all', {
    params: {
      size,
      page,
    },
  });
};

export const getCourseById = async (id: string) => {
  return api.get(`/course/${id}`);
};

export const createCourse = async (course: any) => {
  return api.post('/course/create', course);
};

export const uploadCoverImage = async (file: string | Blob, id: string) => {
  try {
    const data = new FormData();

    data.append('file', file);

    await uploadImage({
      id,
      data,
      entityType: EntityType.COURSE,
    });
  } catch {
    toast.error('Erro ao salvar imagem do curso!');
  }
};

export const getCoverImage = async (id: string) => {
  try {
    const response = await getImage({
      id,
      entityType: EntityType.COURSE,
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    return url;
  } catch {}
};
