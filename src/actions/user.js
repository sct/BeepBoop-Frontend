import api from '../utils/api';

export const SET_TOKEN = 'SET_TOKEN';
export const FOUND_USER = 'FOUND_USER';
export const LOADING_USER = 'LOADING_USER';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

const loadingUser = () => {
  return {
    type: LOADING_USER,
  };
};

const userError = (error) => {
  return {
    type: USER_ERROR,
    payload: {
      error,
    },
  };
};

const foundUser = (user) => {
  return {
    type: FOUND_USER,
    payload: {
      user,
    },
  };
};

const setToken = (token, expires) => {
  return {
    type: SET_TOKEN,
    payload: {
      token,
      expires,
    },
  };
};

export const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expires');
  return {
    type: USER_LOGOUT,
  };
};

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(loadingUser());
    const userState = getState().user;
    return api.setAuthToken(userState.token).apiRequest('auth/user')
      .then(user => dispatch(foundUser(user)))
      .catch(e => dispatch(userError(e.message)));
  };
};

export const doLogin = (token, expires) => {
  return (dispatch) => {
    dispatch(setToken(token, expires));
    dispatch(fetchUser());
  };
};
