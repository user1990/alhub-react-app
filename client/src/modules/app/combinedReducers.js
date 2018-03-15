import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { userReducer, localeReducer } from './reducers';

export default combineReducers({
  user: userReducer,
  locale: localeReducer,
  form: reduxForm,
});
