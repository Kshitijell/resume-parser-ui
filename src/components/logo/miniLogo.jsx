import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import { useSettingsContext } from '../settings';

const MiniLogo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const settings = useSettingsContext();
  const logo = (
    <Box
      ref={ref}
      component="img"
      src={settings.themeMode === 'light'}
      sx={{ width: 45, height: 40, cursor: 'pointer', ...sx }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to='/' sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

MiniLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default MiniLogo;
