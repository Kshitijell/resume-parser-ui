import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { getSessionStorage, setSessionStorage } from 'src/utils/helper';

import { AuthContext } from './auth-context';

const initialState = {
  user: null,
  loading: true,
  refeshedAccessToken: null,
  account: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN' || action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
      account: null,
    };
  }
  if (action.type === 'REFRESH_ACCESSTOKEN') {
    return {
      ...state,
      refeshedAccessToken: action.payload,
    };
  }
  if (action.type === 'SET_ACCOUNT') {
    return {
      ...state,
      account: action.payload,
    };
  }
  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialize = useCallback(async () => {
    try {
      const accessToken = getSessionStorage('accesstoken');
      if (accessToken) {
        const user = getSessionStorage('user');

        dispatch({
          type: 'INITIAL',
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);



  const login = useCallback(async (res) => {
    try {
      const formData = new FormData();
      formData.append('username', res.username);
      formData.append('password', res.password);

      const response = await fetch(`${import.meta.env.VITE_API_KEY}login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { data } = await response.json();
      const userDetails = {
        name: data?.Users[0]?.User_name,
        username: data?.Users[0]?.User_name,
        password: data?.Users[0]?.Password,
        application: data?.Users[0]?.Application,
        isAdmin: data?.Users[0]?.IsAdmin,
        orgId: data?.Users[0]?.Org_id
      };

      if (res.username !== userDetails.username && res.password !== userDetails.password) return false;

      // Store user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));


      setSessionStorage('accesstoken', res.username);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: userDetails,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = '';
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      refeshedAccessToken: state.refeshedAccessToken,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
    }),
    [login, logout, state.user, status, state.refeshedAccessToken]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
