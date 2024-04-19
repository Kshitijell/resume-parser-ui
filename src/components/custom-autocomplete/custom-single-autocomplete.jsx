import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { CustomTextField } from '../custom-textfield';
import { StyledAutocomplete } from './styles';

const SingleAutocompleteField = ({
  id,
  options,
  getOptionLabel,
  loading = false,
  valueKey,
  label,
  field,
  allProps,
}) => (
  <StyledAutocomplete
    id={id}
    options={options}
    getOptionLabel={getOptionLabel}
    value={
      options?.find((option) => option[valueKey] === allProps?.values?.[field]?.[valueKey])
        ? options?.find((option) => option[valueKey] === allProps?.values?.[field]?.[valueKey])
        : null
    }
    onChange={(event, newValue) => {
      allProps.setFieldValue(field, newValue || null);
    }}
    onBlur={(event) => {
      if (typeof allProps.values.country === 'string') {
        allProps.setFieldValue(field, null);
      }
    }}
    renderInput={(params) => (
      <Field
        {...params}
        as={CustomTextField}
        name={field}
        loading={loading}
        label={label}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
        helperText={<ErrorMessage name={field} />}
        error={Boolean(allProps?.errors?.[field] && allProps?.touched?.[field])}
      />
    )}
  />
);

export default SingleAutocompleteField;

SingleAutocompleteField.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  getOptionLabel: PropTypes.any,
  valueKey: PropTypes.any,
  label: PropTypes.string,
  allProps: PropTypes.any,
  field: PropTypes.any,
  loading: PropTypes.bool,
};
