import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { addLocaleData, IntlProvider } from 'react-intl';
import lt from 'react-intl/locale-data/lt';
import en from 'react-intl/locale-data/en';
import {
  localeSet,
  fetchCurrentUserSuccess,
  fetchCurrentUserRequest,
} from './modules/app/reducers';
import messages from './resources/messages';
import flattenMessages from './utils/flattenMessages';
import store from './modules/app/store';
import App from './modules/app/App';
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

require('react-hot-loader/patch');

addLocaleData([...lt, ...en]);

// Save user in localstorage
if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUserRequest());
} else {
  store.dispatch(fetchCurrentUserSuccess({}));
}

if (localStorage.alhubLocale) {
  store.dispatch(localeSet(localStorage.alhubLocale));
}

const mapStateToProps = state => ({
  locale: state.locale,
  messages: flattenMessages(messages[state.locale]),
});

const IntlProviderContainer = connect(mapStateToProps)(IntlProvider);

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <IntlProviderContainer>
          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </IntlProviderContainer>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./modules/app/App', () => {
    render(App);
  });
}

registerServiceWorker();
