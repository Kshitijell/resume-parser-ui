import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { fileData } from '../file-thumbnail';

export default function RejectionFiles({ fileRejections, maxSize, maxFiles }) {
  if (!fileRejections.length) {
    return null;
  }
  if (fileRejections.length > maxFiles) {
    return (
      <Paper
        variant="outlined"
        sx={{
          py: 1,
          px: 2,
          mt: 3,
          textAlign: 'left',
          borderStyle: 'solid',
          borderColor: 'error.main',
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        }}
      >
        <Box sx={{ my: 1 }}>
          <Typography variant="subtitle2" noWrap>
            Upload limit exceeded. Please try again with 5 or fewer files.
          </Typography>
        </Box>
      </Paper>
    );
  }
  const renderError = (error) => {
    if (error.code === 'file-too-large') {
      return (
        <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
          - File is larger than {`${(maxSize / 1000000)?.toFixed(2)} MB`}
        </Box>
      );
    }
    return (
      <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
        - {error.message}
      </Box>
    );
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'solid',
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {`${(size / 1000000)?.toFixed(3)} MB`}
            </Typography>

            {errors.map((error) => renderError(error))}
          </Box>
        );
      })}
    </Paper>
  );
}

RejectionFiles.propTypes = {
  fileRejections: PropTypes.array,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
};
