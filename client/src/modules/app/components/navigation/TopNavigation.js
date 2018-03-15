import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import gravatarUrl from 'gravatar-url';
import { logout, setLocale } from '../../reducers';

class TopNavigation extends Component {
  state = {
    isOpen: false,
  };

  render() {
    const { user, logout } = this.props;

    return (
      <Navbar light expand="sm" color="faded">
        <NavbarBrand tag={RouterNavLink} activeClassName="active" to="/">
          ALHub
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                activeClassName="active"
                to="/dashboard"
              >
                <FormattedMessage id="nav.dashboard" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <button onClick={() => this.props.setLocale('en')}>EN</button> |
            <button onClick={() => this.props.setLocale('lt')}>LT</button>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <img
                  className="img-fluid rounded-circle"
                  src={gravatarUrl(user.email, { size: 40 })}
                  alt="Gravatar"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <FormattedMessage id="nav.account" />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => logout()}>
                  <FormattedMessage id="nav.logout" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout, setLocale }, null, {
  pure: false,
})(TopNavigation);
