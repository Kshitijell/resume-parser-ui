import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import { RouterLink } from 'src/routes/components';
import Iconify from '../../iconify';
import { StyledItem, StyledIcon } from './styles';

const renderColor = (theme, active) => {
  let color = active ? theme.palette.primary.main : theme.palette.grey[700];
  if (theme.palette.mode !== 'light') {
    color = theme.palette.common.white;
  }
  return color;
};

const renderListItemTextStyles = (subItem, theme, active) => {
  const styles = {
    width: 1,
    flex: 'unset',
    ...(subItem && {
      textAlign: 'unset',
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
      fontWeight: active ? 700 : 600,
    }),
  };

  if (!subItem) {
    styles.px = 0.5;
    styles.mt = 0.5;
  }

  return styles;
};

const NavItem = forwardRef(({ item, depth, open, active, externalLink, config, ...other }, ref) => {
  const theme = useTheme();

  const { title, path, icon, children, disabled, caption, roles } = item;
  const subItem = depth !== 1;

  if (roles && !roles.includes(`${config.currentRole}`)) {
    return null;
  }

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
            color: renderColor(theme, active),
            ...(subItem && { mr: 1.5 }),
          }}
        >
          {icon}
        </StyledIcon>
      )}

      {!(config.hiddenLabel && !subItem) && (
        <ListItemText
          sx={{
            ...renderListItemTextStyles(subItem, theme, active),
          }}
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: 10,
            lineHeight: '16px',
            textAlign: 'center',
            textTransform: 'capitalize',
            color: renderColor(theme, active),
            fontWeight: active ? 700 : 600,
          }}
        />
      )}

      {caption && (
        <Tooltip title={caption} arrow placement="right">
          <Iconify
            width={16}
            icon="eva:info-outline"
            sx={{
              color: 'text.disabled',
              ...(!subItem && {
                top: 11,
                left: 6,
                position: 'absolute',
              }),
            }}
          />
        </Tooltip>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon="eva:arrow-ios-forward-fill"
          sx={{
            top: 11,
            right: 6,
            position: 'absolute',
          }}
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
        sx={{
          width: 1,
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );
  }

  return (
    <Link
      component={RouterLink}
      href={children?.length ? children?.[0]?.path : path}
      underline="none"
      sx={{
        width: 1,
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
