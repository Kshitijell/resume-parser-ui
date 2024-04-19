import { alpha, styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, open, depth, config, theme }) => {
  const subItem = depth !== 1;

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
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: config.itemRadius,
    minHeight: config.itemRootHeight,
    color: theme.palette.text.secondary,
    margin: `0 ${config.itemGap}px ${config.itemGap}px ${config.itemGap}px`,
    ...(config.hiddenLabel &&
      !subItem && {
        padding: config.itemPadding,
      }),

    ...(active && {
      ...activeStyles.root,
    }),

    ...(subItem && {
      margin: 0,
      flexDirection: 'row',
      padding: theme.spacing(0, 1),
      minHeight: config.itemSubHeight,
      ...(active && {
        ...activeStyles.sub,
      }),
    }),

    ...(open &&
      !active && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
  };
});

export const StyledIcon = styled(ListItemIcon)(({ size }) => ({
  width: size,
  height: size,
  marginRight: 0,
}));
