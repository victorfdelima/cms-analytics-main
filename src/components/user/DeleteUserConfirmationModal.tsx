import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import { useDeleteUser } from '@/services/user/deleteUser';
import { useRouter } from 'next/router';

interface DeleteUserModalProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
}

export const DeleteUserModal = ({
  isOpen,
  userId,
  onClose,
}: DeleteUserModalProps) => {
  const router = useRouter();
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({ userId });

      toast.success('Usuário excluído com sucesso!');
      router.push('/users');
    } catch (error) {
      toast.error('Erro ao excluir usuário!');
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Deseja apagar este usuário?
      </DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <LoadingButton
          onClick={handleDeleteUser}
          autoFocus
          variant='contained'
          color='error'
          loading={deleteUserMutation.isLoading}
        >
          Confirmar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
