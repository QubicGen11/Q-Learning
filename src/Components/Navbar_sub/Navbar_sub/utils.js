import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  return !!Cookies.get('accessToken');
};

export const getTokens = () => {
  return {
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken')
  };
};

export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}; 