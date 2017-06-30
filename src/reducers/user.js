import {
  FOUND_USER, SET_TOKEN,
  LOADING_USER, USER_ERROR, USER_LOGOUT,
} from '../actions/user';

export default (state = {
  isFetching: false,
  user: null,
  token: null,
  expires: null,
}, action) => {
  switch (action.type) {
    case LOADING_USER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FOUND_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload.token,
        expires: action.payload.expires,
      });
    case USER_ERROR:
      return Object.assign({}, state, {
        token: null,
        expires: null,
        user: null,
        isFetching: false,
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        token: null,
        expires: null,
        user: null,
        isFetching: false,
      });
    default:
      return state;
  }
};
