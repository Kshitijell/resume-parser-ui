import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import Main from './main';
// import NavMini from './nav-mini';
// import NavVertical from './nav-vertical';
import Header from './header';

export default function DashboardLayout({ children }) {
  const settings = useSettingsContext();

  // const lgUp = useResponsive('up', 'lg');
  const lgDown = useResponsive('down', 'lg');

  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  // const renderNavMini = <NavMini />;

  // const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if ((lgDown && smUp) || smDown) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', sm: 'row' },
          }}
        >
          {/* {lgDown && smUp ? renderNavMini : null} */}
          {/* {renderNavVertical} */}
          <Main>{children}</Main>
        </Box>
      </>
    );
  }
  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />
        {/* {renderNavVertical} */}
        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
         <Header onOpenNav={nav.onTrue} />
        {/* {lgUp ? renderNavMini : renderNavVertical} */}

        <Main>{children}</Main>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
       <Header onOpenNav={nav.onTrue} />
      {/* {renderNavVertical} */}
      <Main>{children}</Main>
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
