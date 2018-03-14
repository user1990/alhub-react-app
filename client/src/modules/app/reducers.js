/* eslint-disable spaced-comment */
import { normalize } from 'normalizr';
import api from '../../services/api';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';

///// CONSTANTS /////
export const actionTypes = {
  USER_LOGGED_IN: 'USER/LOGGED_IN',
  USER_LOGGED_OUT: 'USER/LOGGED_OUT',

  USER_FETCHED: 'USER/USER_FETCHED',
};

///// ACTIONS /////

// Auth
export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  payload: user,
});

export const userLoggedOut = () => ({
  type: actionTypes.USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);

// Users
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const userFetched = user => ({
  type: actionTypes.USER_FETCHED,
  payload: user,
});

export const fetchCurrentUser = () => dispatch =>
  api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));

///// REDUCERS /////

// User
export const userReducer = (user = { loaded: false }, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return action.payload;

    case actionTypes.USER_FETCHED:
      return {
        ...user,
        ...action.payload,
        loaded: true,
      };

    case actionTypes.USER_LOGGED_OUT:
      return { loaded: true };

    default:
      return user;
  }
};
