import { toast } from 'react-toastify';

import { EntityType, getImage, uploadImage } from './image';

export const uploadClassImage = async (file: string | Blob, id: string) => {
  try {
    const data = new FormData();

    data.append('file', file);

    await uploadImage({
      id,
      data,
      entityType: EntityType.CLASS,
    });
  } catch {
    toast.error('Erro ao salvar imagem do curso!');
  }
};

export const getClassImage = async (id: string) => {
  try {
    const response = await getImage({
      id,
      entityType: EntityType.CLASS,
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    return url;
  } catch {}
};
