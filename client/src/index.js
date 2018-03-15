import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './modules/app/store';
import App from './modules/app/App';
import registerServiceWorker from './registerServiceWorker';

require('react-hot-loader/patch');

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
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
