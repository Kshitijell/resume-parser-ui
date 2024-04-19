import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import { RouterLink } from 'src/routes/components';
import Iconify from '../../iconify';
import { StyledItem, StyledIcon } from './styles';

const NavItem = forwardRef(({ item, depth, open, active, externalLink, config, ...other }, ref) => {
  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      disableGutters
      ref={ref}
      open={open}
      depth={depth}
      active={active}
      disabled={disabled}
      config={config}
      {...other}
    >
      {icon && (
        <StyledIcon
          size={config.iconSize}
          sx={{
            ...(subItem && { mr: 1.5 }),
          }}
        >
          {icon}
        </StyledIcon>
      )}

      {!(config.hiddenLabel && !subItem) && (
        <ListItemText
          sx={{
            ...(!subItem && {
              ml: 1,
            }),
          }}
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            typography: 'body2',
            textTransform: 'capitalize',
            fontWeight: active ? 'fontWeightBold' : 'fontWeightMedium',
            ...(subItem && {
              fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
            }),
          }}
        />
      )}

      {info && (
        <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {caption && (
        <Tooltip title={caption} arrow>
          <Iconify width={16} icon="eva:info-outline" sx={{ ml: 0.5, color: 'text.disabled' }} />
        </Tooltip>
      )}

      {!!children && (
        <Iconify
          icon={subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
          width={16}
          sx={{ flexShrink: 0, ml: 0.5 }}
        />
      )}
    </StyledItem>
  );

  if (roles && !roles.includes(`${config.currentRole}`)) {
    return null;
  }

  if (externalLink)
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );

  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      sx={{
        ...(disabled && {
          cursor: 'default',
        }),
      }}
    >
      {renderContent}
    </Link>
  );
});

NavItem.propTypes = {
  active: PropTypes.bool,
  config: PropTypes.object,
  depth: PropTypes.number,
  externalLink: PropTypes.bool,
  item: PropTypes.object,
  open: PropTypes.bool,
};

export default NavItem;
