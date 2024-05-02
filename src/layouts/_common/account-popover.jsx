import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Card, CardHeader, Grid, Switch, styled } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useTheme } from '@mui/material/styles';

const stringAvatar = (name) => ({
  children: `${name?.split(' ')?.[0]?.[0]}`,
});

export default function AccountPopover({ showOnlyAvatar }) {
  const router = useRouter();
  const theme = useTheme();
  const settings = useSettingsContext();

  const { logout } = useAuthContext();

  const popover = usePopover();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      left: 0,
      transform: 'translateX(7px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Stack
      sx={{
        cursor: 'pointer',
        pb: 0,
        '.MuiPaper-root': { boxShadow: 'none', background: 'transparent' },
      }}
    >
      <Card onClick={popover.onOpen} sx={{ p: 0 }}>
        <CardHeader
          sx={{ p: 0, textAlign: 'left' }}
          avatar={
            <Avatar
              title='Logged In'
              sx={{
                width: 42,
                height: 42,
                backgroundColor: (themeColor) => themeColor.palette.primary.main,
                color: (themeColor) => themeColor.palette.grey[0],
              }}
              {...stringAvatar(JSON.parse(localStorage.getItem('userDetails'))?.username.toUpperCase())}
            />
          }
          {...(!showOnlyAvatar && {
            title: (
              <Typography
                sx={{
                  fontSize: theme.typography.body2.fontSize,
                  lineHeight: theme.typography.body2.lineHeight,
                }}
              >
                {JSON.parse(localStorage.getItem('userDetails'))?.username}
              </Typography>
            ),
          })}
        />
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
        arrow={showOnlyAvatar ? 'top-right' : 'left-bottom'}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {JSON.parse(localStorage.getItem('userDetails'))?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            onClick={() => {
              settings.onUpdate('themeMode', theme.palette.mode === 'light' ? 'dark' : 'light');
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography varient="subtitle2">Theme</Typography>
              <MaterialUISwitch checked={theme.palette.mode === 'dark'} />
            </Grid>
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'success.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </Stack>
  );
}
AccountPopover.propTypes = {
  showOnlyAvatar: PropTypes.bool,
};
