import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import { HEADER, NAV } from '../config-layout';

const SPACING = 16;

export default function Main({ children, sx, ...other }) {
  const settings = useSettingsContext();
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const lgDown = useResponsive('down', 'lg');
  const smDown = useResponsive('down', 'sm');

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.brandColor.greyBackground
              : theme.palette.grey[900],
          pt: `${HEADER.H_MOBILE + 24}px`,
          pb: 10,
          ...(lgUp && {
            pt: `${HEADER.H_MOBILE * 2 + 40}px`,
            pb: 15,
          }),
        }}
      >
        {children}
      </Box>
    );
  }
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.brandColor.greyBackground
            : theme.palette.grey[900],
        pt: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          // px: 1,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI}px)`,
          }),
        }),
        ...(lgDown && {
          pt: 2,
          width: `calc(100% - ${NAV.W_MINI + 100}px)`,
        }),
        ...(smDown && {
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          width: `calc(100% - 0px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
