import { alpha, styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, depth, config, theme }) => {
  const subItem = depth !== 1;

  const deepSubItem = depth > 2;

  const activeStyles = {
    root: {
      color:
        theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },
    sub: {
      color:
        theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },
  };

  return {
    padding: config.itemPadding,
    marginBottom: config.itemGap,
    borderRadius: config.itemRadius,
    minHeight: config.itemRootHeight,
    color: theme.palette.text.secondary,

    ...(active && {
      ...activeStyles.root,
    }),

    ...(subItem && {
      minHeight: config.itemSubHeight,
      ...(active && {
        ...activeStyles.sub,
      }),
    }),

    ...(deepSubItem && {
      paddingLeft: theme.spacing(depth),
    }),
  };
});

export const StyledIcon = styled(ListItemIcon)(({ size }) => ({
  width: size,
  height: size,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledDotIcon = styled('span')(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: theme.palette.text.primary,
  }),
}));

export const StyledSubheader = styled(ListSubheader)(({ config, theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  cursor: 'pointer',
  display: 'inline-flex',
  padding: config.itemPadding,
  paddingTop: theme.spacing(2),
  marginBottom: config.itemGap,
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.disabled,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));
