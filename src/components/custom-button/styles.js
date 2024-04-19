import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(() => {
  const height = '44px';
  return {
    pr: 2,
    pl: 2,
    height,
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'auto',
    },
  };
});
