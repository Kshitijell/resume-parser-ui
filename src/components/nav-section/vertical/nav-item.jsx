import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import { RouterLink } from 'src/routes/components';
import { useTheme } from '@emotion/react';
import { pxToRem } from 'src/theme/typography';
import Iconify from '../../iconify';
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';

const renderColor = (theme, active) => {
  let color = active ? theme.palette.primary.main : theme.palette.grey[700];
  if (theme.palette.mode !== 'light') {
    color = theme.palette.common.white;
  }
  return color;
};

const renderListItemText = (title, caption, color, active) => (
  <ListItemText
    primary={title}
    secondary={
      caption && (
        <Tooltip title={caption} placement="top-start">
          <span>{caption}</span>
        </Tooltip>
      )
    }
    primaryTypographyProps={{
      noWrap: true,
      fontSize: pxToRem(14),
      color,
      textTransform: 'capitalize',
      fontWeight: active ? 700 : 600,
      letterSpacing: '0.1px',
    }}
    secondaryTypographyProps={{
      noWrap: true,
      component: 'span',
      typography: 'caption',
      color: 'text.disabled',
      fontWeight: active ? 700 : 600,
    }}
  />
);

const renderIcon = (icon, color, size, config, subItem, active) => (
  <>
    {icon && (
      <StyledIcon
        sx={{
          color,
        }}
        size={size}
      >
        {icon}
      </StyledIcon>
    )}

    {subItem && (
      <StyledIcon size={size}>
        <StyledDotIcon active={active} />
      </StyledIcon>
    )}
  </>
);

export default function NavItem({ item, open, depth, active, config, externalLink, ...other }) {
  const { title, path, icon, info, children, disabled, caption, roles } = item;
  const theme = useTheme();
  const subItem = depth !== 1;

  if (roles && !roles.includes(`${config.currentRole}`)) {
    return null;
  }

  const color = renderColor(theme, active);

  const renderContent = (
    <StyledItem
      disableGutters
      disabled={disabled}
      active={active}
      depth={depth}
      config={config}
      {...other}
    >
      {renderIcon(icon, color, config.iconSize, config, subItem, active)}

      {!(config.hiddenLabel && !subItem) && renderListItemText(title, caption, color, active)}

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  if (externalLink) {
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        color="inherit"
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );
  }

  if (children) {
    return renderContent;
  }

  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      color="inherit"
      sx={{
        ...(disabled && {
          cursor: 'default',
        }),
      }}
    >
      {renderContent}
    </Link>
  );
}

NavItem.propTypes = {
  active: PropTypes.bool,
  config: PropTypes.object,
  depth: PropTypes.number,
  externalLink: PropTypes.bool,
  item: PropTypes.object,
  open: PropTypes.bool,
};
