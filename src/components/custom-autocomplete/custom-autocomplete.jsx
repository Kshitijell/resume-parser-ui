import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { Checkbox, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomTextField } from '../custom-textfield';
import Iconify from '../iconify/iconify';
import { StyledAutocomplete } from './styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '21px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.grey[0],
  '.MuiChip-deleteIcon': {
    display: 'none',
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '.MuiChip-label': {
    padding: '0 6px',
  },
}));



const CustomAutoComplete = ({ selectedValues, data, handleChange, loading, name, label }) => {
  const [filteredOptions, setFilteredOptions] = useState(data?.slice(0, 50));
  useEffect(() => {
    if (data) {
      setFilteredOptions(data?.slice(0, 50));
    }
  }, [data]);

  const handleInputChange = (event) => {
    if (event.target.value.trim() !== '') {
      const filteredData = data?.filter((option) =>
        option.label.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredOptions(filteredData?.slice(0, 50));
    } else {
      setFilteredOptions(data?.slice(0, 50));
    }
  };

  return (
    <StyledAutocomplete
      multiple
      options={filteredOptions}
      value={selectedValues}
      onChange={handleChange}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderTags={(value, getTagProps) => {
        const numSelected = value.length - 1;
        return (
          <>
            {value.slice(0, 1).map((option, index) => (
              <StyledChip
                key={option.value}
                label={option.label}
                onDelete={() => {}}
                sx={{ width: '50px' }}
                {...getTagProps({ index })}
              />
            ))}
            {numSelected > 0 && <StyledChip onDelete={null} label={`+${numSelected}`} />}
          </>
        );
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          onChange={handleInputChange}
          name={name}
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
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Checkbox
            icon={<Iconify icon="mdi:checkbox-blank-outline" />}
            checkedIcon={<Iconify icon="bxs:checkbox-checked" />}
            style={{ marginRight: 8 }}
            checked={selectedValues?.some((val) => val?.label === option?.label)}
          />
          {option.label}
        </li>
      )}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
    />
  );
};

export default CustomAutoComplete;

CustomAutoComplete.propTypes = {
  selectedValues: PropTypes.any,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  loading: PropTypes.bool,
  label: PropTypes.string,
};
