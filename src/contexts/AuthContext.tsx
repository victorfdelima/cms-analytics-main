import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '@/services/api';
import { User } from '@/types/user';
import Router from 'next/router';


interface SignInCredentials {
  email: string;
  password: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};
export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('@DohlerCMS:token');

    if (!token) {
      setIsLoading(false);
      Router.push('/login');
    }

    if (token) {
      api
        .get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const data = response.data;
          setUser(data);
        })
        .catch(_ => {
          signOut();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      console.log(response.data)
      const { accessToken } = response.data.token;

      localStorage.setItem('token', response.data.token);
      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      const userResponse = await api.get('/users/2');

      setUser(userResponse.data);

      toast.success('Login realizado com sucesso!');

      Router.push('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem('@DohlerCMS:token');

    setUser(null);

    Router.push('/login');
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
