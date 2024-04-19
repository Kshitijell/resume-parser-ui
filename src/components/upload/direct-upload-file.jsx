import { CircularProgress, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const DirectUploadFilePreview = ({ sx }) => (
  <Stack sx={{ ...sx }} spacing={2} alignItems="center">
    <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '100%' }}>
      <CircularProgress variant="indeterminate" color="success" value={0} size={20} thickness={6} />
    </Stack>
  </Stack>
);

export default DirectUploadFilePreview;
DirectUploadFilePreview.propTypes = {
  sx: PropTypes.object,
};
