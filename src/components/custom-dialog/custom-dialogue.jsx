import PropTypes from 'prop-types';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions, Grid, IconButton } from '@mui/material';
import Iconify from '../iconify';

export default function CustomDialogue({
  title,
  content, 
  contentProps, 
  action,
  open,
  onClose,
  bottomAction,
  ...other
}) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 0 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>{title}</Grid>
          <Grid display="flex" alignItems="center" justifyContent="end">
            {action}
            <IconButton onClick={onClose}>
              <Iconify icon="iconamoon:close" height={25} width={25} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      {content && (
        <DialogContent dividers sx={{ typography: 'body2',py:1.5}} {...contentProps}>
          {content}
        </DialogContent>
      )}
      {bottomAction && <DialogActions sx={{p:1.5}}>{bottomAction}</DialogActions>}
    </Dialog>
  );
}

CustomDialogue.propTypes = {
  action: PropTypes.node,
  bottomAction: PropTypes.node,
  content: PropTypes.node,
  contentProps: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
