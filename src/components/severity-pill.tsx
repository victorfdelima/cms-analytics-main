import { styled, Theme } from '@mui/material/styles';

type SeverityPillRootProps = {
  theme?: Theme;
  ownerState:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning'
    | 'success';
};

const SeverityPillRoot = styled('span')<SeverityPillRootProps>(
  ({ theme, ownerState }) => {
    const backgroundColor = theme.palette[ownerState].main;
    const color = theme.palette[ownerState].contrastText;

    return {
      alignItems: 'center',
      backgroundColor,
      borderRadius: 12,
      color,
      cursor: 'default',
      display: 'inline-flex',
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 20,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    };
  }
);

type ServerityPillProps = {
  color: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
  children: React.ReactNode;
};

export const SeverityPill = (props: ServerityPillProps) => {
  const { color = 'primary', children } = props;

  return <SeverityPillRoot ownerState={color}>{children}</SeverityPillRoot>;
};
