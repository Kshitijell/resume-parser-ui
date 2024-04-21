import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify';
import RejectionFiles from './errors-rejection-files';
import MultiFilePreview from './preview-multi-file';
import SingleFilePreview from './preview-single-file';

export default function Upload({
  label,
  disabled,
  multiple = false,
  error,
  helperText,
  file,
  onDelete,
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  accept,
  isDirectUploadFile,
  maxSize,
  maxFiles,
  ...other
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    accept,
    maxSize,
    maxFiles,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      {/* <UploadIllustration sx={{ width: 1, maxWidth: 200 }} /> */}
      <Stack spacing={1} sx={{ textAlign: 'center', marginTop: '150px' }}>
        <Typography variant="body5" sx={{ color: 'text.secondary' }}>Browse PDF Documents</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
        <Typography variant="body5" sx={{ color: 'text.secondary' }}>
          Drag and drop PDF document here
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview} />
  );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 1 }}>
        <MultiFilePreview
          files={files}
          thumbnail={thumbnail}
          onRemove={onRemove}
          isDirectUploadFile={isDirectUploadFile}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', padding: 1, ...sx }}>
      {label && <Typography variant='body1' sx={{ color: 'text.secondary' }}>{label}</Typography>}
      <Box
        {...getRootProps()}
        sx={{
          p: 2,
          height: '400px',
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>
      <RejectionFiles fileRejections={fileRejections} maxSize={maxSize} maxFiles={maxFiles} />

      {removeSinglePreview}

      {helperText && <>{helperText}</>}

      {renderMultiPreview}
    </Box>
  );
}

Upload.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  files: PropTypes.array,
  helperText: PropTypes.object,
  multiple: PropTypes.bool,
  onDelete: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  sx: PropTypes.object,
  accept: PropTypes.object,
  thumbnail: PropTypes.bool,
  isDirectUploadFile: PropTypes.bool,
};
