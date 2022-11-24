import { ReactNode, useEffect } from 'react';
import type { FC } from 'react';

import { LibraryBooks, PermIdentity, VerifiedUser } from '@mui/icons-material';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

import { useRouter } from 'next/router';
import { House } from 'phosphor-react';

import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { Scrollbar } from './misc/scrollbar';

interface DashboardSidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (): Section[] => [
  {
    title: 'Geral',
    items: [
      {
        title: 'Pagina Inicial',
        path: '/',
        icon: <House size={32} />,
      },
      {
        title: 'Analíticos',
        path: '/analytics',
        icon: <House size={32} />,
      },
    ],

  },
  
  {
    title: 'CRUDS',
    items: [
      {
        title: 'Instrutores',
        path: '/instructors',
        icon: <PermIdentity fontSize='small' />,
        children: [
          {
            title: 'Listagem',
            path: '/instructors',
          },
          {
            title: 'Adicionar um novo',
            path: '/instructors/create',
          },
        ],
      },
      {
        title: 'Usuários',
        path: '/users',
        icon: <VerifiedUser fontSize='small' />,
        children: [
          {
            title: 'Listagem',
            path: '/users',
          },
          {
            title: 'Criar um novo',
            path: '/users/create',
          },
        ],
      },
      {
        title: 'Cursos',
        path: '/courses',
        icon: <LibraryBooks fontSize='small' />,
        children: [
          {
            title: 'Listagem',
            path: '/courses',
          },
          {
            title: 'Criar um novo',
            path: '/courses/create',
          },
        ],
      },
    ],
  },
];

export const DashboardSidebar: FC<DashboardSidebarProps> = props => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const sections = getSections();

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
          backgroundColor: ' #472e5f',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <img
              alt='Logo'
              src='/logo-compact.svg'
              style={{ width: '100%', maxWidth: 200 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {sections.map(section => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: theme => (theme.palette.mode === 'dark' ? 1 : 0),
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};
