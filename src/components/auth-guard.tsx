import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export const AuthGuard = props => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para acessar essa página!');
      router
        .replace({
          pathname: '/login',
          query:
            router.asPath !== '/' ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router, router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
