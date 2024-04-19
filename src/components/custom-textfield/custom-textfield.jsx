import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from './styles';

const CustomTextField = (props) => {
  const configTextfield = {
    ...props,
  };

  return (
    <StyledTextField
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          height: '44px',
          '& fieldset': {
            borderColor: (theme) => theme.palette.grey[500],
          },
        },
      }}
      {...configTextfield}
    />
  );
};

export default CustomTextField;

CustomTextField.propTypes = {
  name: PropTypes.string,
};
