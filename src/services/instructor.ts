import { toast } from 'react-toastify';

import { Instructor } from '@/types/instructor';

import api from './api';
import { EntityType, getImage, uploadImage } from './image';

export const uploadProfileImage = async (file: string | Blob, id: string) => {
  try {
    const data = new FormData();

    data.append('file', file);

    await uploadImage({
      id,
      data,
      entityType: EntityType.INSTRUCTOR,
    });
  } catch {
    toast.error('Erro ao salvar imagem de perfil!');
  }
};

export const getProfileImage = async (id: string) => {
  try {
    const response = await getImage({
      id,
      entityType: EntityType.INSTRUCTOR,
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    return url;
  } catch {}
};

export const getAllInstructors = async (
  size = 12,
  page = 0
): Promise<Instructor[]> => {
  try {
    const response = await api.get('/instructor/all', {
      params: {
        size,
        page,
      },
    });

    const instructors = Promise.all(
      response.data.instructors.map(async instructor => {
        const profileImage = await getProfileImage(instructor.id);

        return {
          ...instructor,
          profileImage,
        };
      })
    );

    return instructors;
  } catch (error) {
    throw new Error(error);
  }
};

export const getInstructorById = async (id: string): Promise<Instructor> => {
  try {
    const response = await api.get<Instructor>(`/instructor/${id}`);

    const profileImage = await getProfileImage(id);

    const instructor = {
      ...response.data,
      profileImage,
    };

    return instructor;
  } catch (error) {
    throw new Error(error);
  }
};
