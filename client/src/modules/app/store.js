import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from './combinedReducers';
import { fetchCurrentUserSuccess, fetchCurrentUserRequest } from './reducers';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

// Save user in localstorage
if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUserRequest());
} else {
  store.dispatch(fetchCurrentUserSuccess({}));
}

export default store;
