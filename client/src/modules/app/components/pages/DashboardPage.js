import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

class DashboardPage extends Component {
  componentDidMount = () => {};

  render() {
    const { isConfirmed } = this.props;
    return <div>{!isConfirmed && <ConfirmEmailMessage />}</div>;
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isConfirmed: !!state.user.confirmed,
});

export default connect(mapStateToProps)(DashboardPage);
