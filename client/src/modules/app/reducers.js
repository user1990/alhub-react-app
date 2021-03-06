/* eslint-disable spaced-comment */
import { createSelector } from 'reselect';
import api from '../../services/api';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';

///// CONSTANTS /////
export const actionTypes = {
  LOCALE_SET: 'LOCALE_SET',

  USER_LOGGED_IN: 'USER/LOGGED_IN',
  USER_LOGGED_OUT: 'USER/LOGGED_OUT',

  CREATE_USER_REQUEST: 'CREATE/USER_REQUEST',
  CREATE_USER_FAILURE: 'CREATE/USER_FAILURE',

  FETCH_CURRENT_USER_REQUEST: 'FETCH/CURRENT_USER_REQUEST',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH/CURRENT_USER_SUCCESS',
};

///// ACTIONS /////

// Auth
export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: actionTypes.USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn({ ...user, loaded: true }));
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

export const fetchCurrentUserRequest = () => ({
  type: actionTypes.FETCH_CURRENT_USER_REQUEST,
});

export const fetchCurrentUserSuccess = user => ({
  type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user,
});

export const createUserRequest = user => ({
  type: actionTypes.CREATE_USER_REQUEST,
  user,
});

export const createUserFailure = errors => ({
  type: actionTypes.CREATE_USER_FAILURE,
  errors,
});

// Locale
export const localeSet = locale => ({
  type: actionTypes.LOCALE_SET,
  payload: locale,
});

export const setLocale = locale => dispatch => {
  localStorage.alhubLocale = locale;
  dispatch(localeSet(locale));
};

///// REDUCERS /////

// User
export const userReducer = (user = { loaded: false }, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return {
        ...action.user,
        loaded: true,
      };

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...user,
        ...action.user,
        loaded: true,
      };

    case actionTypes.USER_LOGGED_OUT:
      return { loaded: true };

    default:
      return user;
  }
};

// Characters
export const charactersReducer = (characters = {}, action = {}) => {
  switch (action.type) {
    default:
      return characters;
  }
};

// Locale
export const localeReducer = (locale = 'en', action) => {
  switch (action.type) {
    case actionTypes.LOCALE_SET:
      return action.payload;

    default:
      return locale;
  }
};

///// SELECTORS /////
export const charactersHashSelector = state => state.characters;

export const charactersSelector = createSelector(charactersHashSelector, hash =>
  Object.values(hash)
);
