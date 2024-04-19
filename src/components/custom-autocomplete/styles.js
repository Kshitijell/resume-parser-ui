import { Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  root:{
    innerHeight:44,
    outerHeight:44
  },
  '& .MuiInputBase-root': { pt: '0px' },
  '& .MuiOutlinedInput-root .MuiAutocomplete-input':{
    padding:'0 0 0 0'
  },
  '& .MuiAutocomplete-input':{
    padding:0
  }
}));

