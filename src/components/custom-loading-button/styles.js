import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

export const StyledLoadingButton = styled(LoadingButton)(({ theme, variant, name }) => {
  const commonColor = theme.palette.common.white;
  let backgroundColor;
  let color;
  let height = '44px';
  let fontWeight = 'normal';
  if (variant === 'submit') {
    if (name === 'download') {
      color = theme.palette.submit.primary;
      backgroundColor = theme.palette.success.extra;
      height = '30px';
      fontWeight = 'bold';
    } else {
      color = theme.palette.mode === 'light' ? commonColor : theme.palette.submit.primary;
      backgroundColor = theme.palette.mode === 'light' ? theme.palette.submit.primary : commonColor;
    }
  } else if (name === 'generate') {
    color = theme.palette.primary.dark;
    backgroundColor = theme.palette.primary.lighter;
    height = '30px';
    fontWeight = 'bold';
  } else {
    color = commonColor;
    backgroundColor = theme.palette.primary.main;
  }

  return {
    pr: 2,
    pl: 2,
    height,
    fontWeight,
    backgroundColor,
    color,
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'auto',
      color,
      backgroundColor,
    },
    '&:hover': {
      backgroundColor,
    },
  };
});
