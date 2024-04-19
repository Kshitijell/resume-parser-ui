import { alpha } from '@mui/material/styles';
import { fabClasses } from '@mui/material/Fab';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
const getFilledStyles = (theme, ownerState, lightMode) =>
  (ownerState.variant === 'circular' || ownerState.variant === 'extended') && {
    ...((ownerState.color === 'default' || ownerState.color === 'inherit') && {
      boxShadow: lightMode ? theme.customShadows.z8 : theme.customShadows.z12,
      ...(ownerState.color === 'inherit' && {
        backgroundColor: theme.palette.text.primary,
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        '&:hover': {
          backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[400],
        },
      }),
    }),
  };

const getOutlinedStyles = (theme, ownerState) =>
  (ownerState.variant === 'outlined' || ownerState.variant === 'outlinedExtended') && {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ...((ownerState.color === 'default' || ownerState.color === 'inherit') && {
      border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
      ...(ownerState.color === 'default' && {
        color: theme.palette.text.secondary,
      }),
      '&:hover': {
        borderColor: 'currentColor',
        boxShadow: '0 0 0 0.5px currentColor',
        backgroundColor: theme.palette.action.hover,
      },
    }),
  };

const getSoftStyles = (theme, ownerState) =>
  (ownerState.variant === 'soft' || ownerState.variant === 'softExtended') && {
    boxShadow: 'none',
    ...(ownerState.color === 'default' && {
      color: theme.palette.grey[800],
      backgroundColor: theme.palette.grey[300],
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    }),
    ...(ownerState.color === 'inherit' && {
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.24),
      },
    }),
  };

const getColorStyles = (theme, ownerState) =>
  COLORS.map((color) => ({
    ...(ownerState.color === color && {
      // FILLED
      ...((ownerState.variant === 'circular' || ownerState.variant === 'extended') && {
        boxShadow: theme.customShadows[color],
        '&:hover': {
          backgroundColor: theme.palette[color].dark,
        },
      }),
      // OUTLINED
      ...((ownerState.variant === 'outlined' || ownerState.variant === 'outlinedExtended') && {
        color: theme.palette[color].main,
        border: `solid 1px ${alpha(theme.palette[color].main, 0.48)}`,
        '&:hover': {
          backgroundColor: alpha(theme.palette[color].main, 0.08),
        },
      }),
      // SOFT
      ...((ownerState.variant === 'soft' || ownerState.variant === 'softExtended') && {
        color: theme.palette[color][theme.palette.mode === 'light' ? 'dark' : 'light'],
        backgroundColor: alpha(theme.palette[color].main, 0.16),
        '&:hover': {
          backgroundColor: alpha(theme.palette[color].main, 0.32),
        },
      }),
    }),
  }));

export function fab(theme) {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState) => {
    const styles = [
      {
        '&:hover, &:active': {
          boxShadow: 'none',
        },
      },
      getFilledStyles(theme, ownerState, lightMode),
      getOutlinedStyles(theme, ownerState),
      getSoftStyles(theme, ownerState),
    ];

    const colorStyles = getColorStyles(theme, ownerState);
    const disabledState = {
      [`&.${fabClasses.disabled}`]: {
        ...((ownerState.variant === 'outlined' || ownerState.variant === 'outlinedExtended') && {
          backgroundColor: 'transparent',
          border: `solid 1px ${theme.palette.action.disabledBackground}`,
        }),
      },
    };

    const size = {
      ...((ownerState.variant === 'extended' ||
        ownerState.variant === 'outlinedExtended' ||
        ownerState.variant === 'softExtended') && {
        width: 'auto',
        '& svg': {
          marginRight: theme.spacing(1),
        },
        ...(ownerState.size === 'small' && {
          height: 34,
          minHeight: 34,
          borderRadius: 17,
          padding: theme.spacing(0, 1),
        }),
        ...(ownerState.size === 'medium' && {
          height: 40,
          minHeight: 40,
          borderRadius: 20,
          padding: theme.spacing(0, 2),
        }),
        ...(ownerState.size === 'large' && {
          height: 48,
          minHeight: 48,
          borderRadius: 24,
          padding: theme.spacing(0, 2),
        }),
      }),
    };

    return [...styles, ...colorStyles, disabledState, size];
  };

  return {
    MuiFab: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState),
      },
    },
  };
}
