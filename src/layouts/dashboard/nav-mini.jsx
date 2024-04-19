import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { hideScroll } from 'src/theme/css';
import { NavSectionMini } from 'src/components/nav-section';
import { MiniLogo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton, NavUpgrade } from '../_common';

export default function NavMini() {
  const navData = useNavData();
  const settings = useSettingsContext();

  useEffect(() => {
    settings.onUpdate('themeLayout', 'mini');
  }, []);
  
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI, md: NAV.W_MINI, sm: NAV.W_MINI },
        transition: 'all 0.9s ease-in-out',
      }}
    >
      <NavToggleButton
        sx={{
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 0,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <MiniLogo sx={{ ml: 2, my: 2, mb: 3 }} />

        <NavSectionMini data={navData} />
        <Box sx={{ flexGrow: 1 }} />
        <NavUpgrade />
      </Stack>
    </Box>
  );
}
