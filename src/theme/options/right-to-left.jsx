import PropTypes from 'prop-types';
import { useEffect } from 'react';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export default function RTL({ children, themeDirection }) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: 'rtl',
    prepend: true,
  });

  if (themeDirection === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}

RTL.propTypes = {
  children: PropTypes.node,
  themeDirection: PropTypes.oneOf(['rtl', 'ltr']),
};

export function direction(themeDirection) {
  const theme = {
    direction: themeDirection,
  };

  return theme;
}
