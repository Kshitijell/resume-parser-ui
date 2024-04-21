import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CustomTextField } from '../custom-textfield';
import { StyledAutocomplete } from './styles';

const CustomAutoFetchComplete = ({ options, inputProps, autoCompleteProps, ...other }) => (
  <StyledAutocomplete
    sx={{ width: '100%' }}
     options={options}
    {...autoCompleteProps}
    {...other}
    renderInput={(params) => <CustomTextField {...params} {...inputProps} />}
  />
);

CustomAutoFetchComplete.propTypes = {
  options: PropTypes.array,
  inputProps: PropTypes.object,
  autoCompleteProps: PropTypes.object,
};

export default memo(CustomAutoFetchComplete);
