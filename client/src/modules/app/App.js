import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';
import { fetchCurrentUserRequest } from './reducers';
// Componets
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigation from './components/navigation/TopNavigation';
import CharactersPage from './components/pages/CharactersPage';
import NewCharacterPage from './components/pages/NewCharacterPage';
// Routes
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

class App extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  }

  render() {
    const { location, isAuthenticated, loaded } = this.props;

    return (
      <div>
        {isAuthenticated && <TopNavigation />}
        <Route location={location} exact path="/" component={HomePage} />
        <Route
          location={location}
          exact
          path="/confirmation/:token"
          component={ConfirmationPage}
        />
        <GuestRoute
          location={location}
          exact
          path="/login"
          component={LoginPage}
        />
        <GuestRoute
          location={location}
          exact
          path="/signup"
          component={SignupPage}
        />
        <GuestRoute
          location={location}
          exact
          path="/forgot_password"
          component={ForgotPasswordPage}
        />
        <GuestRoute
          location={location}
          exact
          path="/reset_password/:token"
          component={ResetPasswordPage}
        />
        <UserRoute
          location={location}
          exact
          path="/dashboard"
          component={DashboardPage}
        />
        <UserRoute
          location={location}
          exact
          path="/characters"
          component={CharactersPage}
        />
        <UserRoute
          location={location}
          exact
          path="/characters/new"
          component={NewCharacterPage}
        />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.email,
  loaded: state.user.loaded,
  locale: state.locale,
});

const AppContainer = connect(mapStateToProps, { fetchCurrentUserRequest })(App);

export default AppContainer;
