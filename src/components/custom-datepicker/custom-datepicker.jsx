import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, } from '@mui/x-date-pickers';

import { CustomTextField } from '../custom-textfield';

const CustomDatePicker = (props) => {
  const { label, value, onChange, name, disabled, minDate } = props;

  return (
      <DatePicker
        sx={{ height: '100%', width: '100%' }}
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        minDate={minDate}
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            name: 'baseDate',
          },
        }}
      />
   
  );
};

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
};

export default CustomDatePicker;
