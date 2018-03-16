import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { userReducer, charactersReducer, localeReducer } from './reducers';

export default combineReducers({
  user: userReducer,
  characters: charactersReducer,
  locale: localeReducer,
  form: reduxForm,
});
