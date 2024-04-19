import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import { logo_black_emergys } from 'src/assets/images';
import { useSettingsContext } from '../settings';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const settings = useSettingsContext();

  const logo = (
    <Box
      ref={ref}
      component="img"
      src={settings.themeMode === 'light' ? logo_black_emergys : logo_black_emergys}
      sx={{...sx }}
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

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
