import { alpha } from '@mui/material/styles';
import { buttonClasses } from '@mui/material/Button';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

const rootStyles = (ownerState, lightMode, theme) => {
  const inheritColor = ownerState.color === 'inherit';

  const containedVariant = ownerState.variant === 'contained';

  const outlinedVariant = ownerState.variant === 'outlined';

  const textVariant = ownerState.variant === 'text';

  const softVariant = ownerState.variant === 'soft';

  const submitVariant = ownerState.variant === 'submit';

  const smallSize = ownerState.size === 'small';

  const mediumSize = ownerState.size === 'medium';

  const largeSize = ownerState.size === 'large';

  const defaultStyle = {
    ...(inheritColor && {
      // CONTAINED
      ...(containedVariant && {
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
        '&:hover': {
          backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[400],
        },
      }),
      // OUTLINED
      ...(outlinedVariant && {
        borderColor: alpha(theme.palette.grey[500], 0.32),
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),

      // TEXT
      ...(textVariant && {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        },
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette.common.white,
        backgroundColor: alpha(theme.palette.grey[500], 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.grey[500], 0.24),
        },
      }),

      // SUBMIT
      ...(submitVariant && {
        color: lightMode ? theme.palette.common.white : theme.palette.submit.primary,
        backgroundColor: lightMode ? theme.palette.submit.primary : theme.palette.common.white,
        '&:hover': {
          backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[400],
        },
      }),
    }),
    ...(outlinedVariant && {
      '&:hover': {
        borderColor: 'currentColor',
        boxShadow: '0 0 0 0.5px currentColor',
      },
    }),
  };

  const colorStyle = COLORS.map((color) => ({
    ...(ownerState.color === color && {
      // CONTAINED
      ...(containedVariant && {
        '&:hover': {
          boxShadow: theme.customShadows[color],
        },
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette[color][lightMode ? 'dark' : 'light'],
        backgroundColor: alpha(theme.palette[color].main, 0.16),
        '&:hover': {
          backgroundColor: alpha(theme.palette[color].main, 0.32),
        },
        float: 'right',
      }),
    }),
  }));

  const disabledState = {
    [`&.${buttonClasses.disabled}`]: {
      // SOFT
      ...(softVariant && {
        backgroundColor: theme.palette.action.disabledBackground,
      }),
      // SOFT
      ...(containedVariant && {
        // backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.grey[800]
      }),
      cursor:'not-allowed',
      pointerEvents:'auto'
    },
  };

  const size = {
    ...(smallSize && {
      height: 30,
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
      ...(textVariant && {
        paddingLeft: 4,
        paddingRight: 4,
      }),
    }),
    ...(mediumSize && {
      paddingLeft: 12,
      paddingRight: 12,
      ...(textVariant && {
        paddingLeft: 8,
        paddingRight: 8,
      }),
    }),
    ...(largeSize && {
      height: 48,
      fontSize: 15,
      paddingLeft: 16,
      paddingRight: 16,
      ...(textVariant && {
        paddingLeft: 10,
        paddingRight: 10,
      }),
    }),
  };

  return [defaultStyle, ...colorStyle, disabledState, size];
};

export function button(theme) {
  const lightMode = theme.palette.mode === 'light';

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState, lightMode, theme),
      },
    },
  };
}
