import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label': {
      color: theme.palette.grey[500],
    },
    '& .MuiFormControl-root': {
      position: 'relative',
    },
    '& .MuiFormLabel-root': {
      height: '21px',
      lineHeight: 0.9,
    },
    '& .MuiFormHelperText-root': {
      marginTop: '2px',
      marginLeft: '5px',
      fontSize: '10px',
    },
  }));