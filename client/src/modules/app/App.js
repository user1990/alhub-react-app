import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';
import { fetchCurrentUser } from './reducers';
// Componets
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigation from './components/navigation/TopNavigation';
// Routes
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

class App extends Component {
  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.fetchCurrentUser();
    }
  };

  render() {
    const { location, isAuthenticated, loaded } = this.props;

    return (
      <div>
        <Loader loaded={loaded}>
          {isAuthenticated && <TopNavigation />}
          <Route location={location} exact path="/" component={HomePage} />
          <Route
            location={location}
            exact
            path="/confirmation/:token"
            component={ConfirmationPage}
          />
          <UserRoute
            location={location}
            exact
            path="/dashboard"
            component={DashboardPage}
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
        </Loader>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.email,
  loaded: state.user.loaded,
});

const AppContainer = connect(mapStateToProps, { fetchCurrentUser })(App);

export default AppContainer;
