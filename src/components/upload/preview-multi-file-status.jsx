import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Iconify from '../iconify';
import FileThumbnail, { fileData } from '../file-thumbnail';
import DirectUploadFilePreview from './direct-upload-file';

export default function MultiFilePreviewStatus({ thumbnail, files, onRemove, isDirectUploadFile, sx }) {
  return (
    <>
      {files?.map((file, i) => {
        const { key, name = '', size = 0 } = fileData(file);
        const isNotFormatFile = typeof file === 'string';

        if (thumbnail) {
          return (
            <Stack
              key={key ?? i}
              alignItems="center"
              display="inline-flex"
              justifyContent="center"
              sx={{
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: 'hidden',
                position: 'relative',
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                ...sx,
              }}
            >
              <FileThumbnail
                tooltip
                imageView
                file={file}
                sx={{ position: 'absolute' }}
                imgSx={{ position: 'absolute' }}
              />

              {onRemove && (
                <IconButton
                  size="small"
                  onClick={() => onRemove(file)}
                  sx={{
                    p: 0.5,
                    top: 4,
                    right: 4,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                  }}
                >
                  <Iconify icon="mingcute:close-line" width={14} />
                </IconButton>
              )}
            </Stack>
          );
        }

        return (
          <Grid key={key ?? i} container direction="column" width="100%">
            <Stack
              
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                my: 1,
                py: 1,
                px: 1.5,
                borderRadius: 1,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                ...sx,
              }}
            >
              <FileThumbnail file={file} />
              <ListItemText
                primary={isNotFormatFile ? file : name}
                secondary={isNotFormatFile ? '' : `${(size / 1000000)?.toFixed(3)} MB`}
                secondaryTypographyProps={{
                  component: 'span',
                  typography: 'caption',
                }}
              />
            {isDirectUploadFile && <DirectUploadFilePreview onRemove={onRemove} file={file} />}

              {onRemove && !isDirectUploadFile && (
                <IconButton size="small" onClick={() => onRemove(file)}>
                  <Iconify icon="mingcute:close-line" width={16} />
                </IconButton>
              )}
            </Stack>
          </Grid>
        );
      })}
    </>
  );
}

MultiFilePreviewStatus.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
  sx: PropTypes.object,
  thumbnail: PropTypes.bool,
  isDirectUploadFile: PropTypes.bool,
};
