import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { getSessionStorage } from 'src/utils/helper';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const location = useLocation();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    const accessKey = getSessionStorage('accesstoken');
    if (!accessKey) {
      const loginPath = '/login';
      router.replace(loginPath);
    } else {
      setChecked(true);
    }
  }, [router]);

  useEffect(() => {
    check();
  }, [location.key]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
