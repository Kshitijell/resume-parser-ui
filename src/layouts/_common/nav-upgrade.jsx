import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'src/components/settings';
import AccountPopover from './account-popover';

export default function NavUpgrade() {
  const settings = useSettingsContext();
  return (
    <Stack
      sx={{
        px: 1,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="start" justifyContent="end">
        <AccountPopover {...(settings.themeLayout === 'mini' && ({showOnlyAvatar:true}))}/>
      </Stack>
    </Stack>
  );
}
