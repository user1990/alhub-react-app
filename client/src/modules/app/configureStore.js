import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import decode from 'jwt-decode';
import Reducers from './combinedReducers';
import { userLoggedIn, userFetched } from './reducers';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  return store;
};

// Save user token in localstorage
if (localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);
  const user = {
    token: localStorage.bookwormJWT,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  setAuthorizationHeader(localStorage.bookwormJWT);
  configureStore.dispatch(userLoggedIn(user));
} else {
  configureStore.dispatch(userFetched({}));
}

export default configureStore;
