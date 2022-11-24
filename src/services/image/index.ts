import api from '../api';

export enum EntityType {
  INSTRUCTOR = 'INSTRUCTOR',
  USER = 'USER',
  COURSE = 'COURSE',
  CLASS = 'CLASS',
  COMMENT = 'COMMENT',
  POINT = 'POINT',
  STAR = 'STAR',
  PLATFORM = 'PLATFORM',
}

export const uploadImage = async ({
  id,
  data,
  entityType,
}: {
  id: string;
  data: FormData;
  entityType: string;
}) => {
  await api.post(`/image/create/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Entity-Type': entityType,
    },
  });
};

export const getImage = async ({ id, entityType }) => {
  return api.get(`/image/${id}`, {
    responseType: 'blob',
    headers: {
      'Entity-Type': entityType,
    },
  });
};

export const deleteImage = async ({ id, entityType }) => {
  return api.delete(`/image/${id}`, {
    headers: {
      'Entity-Type': entityType,
    },
  });
};
