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
import gravatarUrl from 'gravatar-url';
import { logout } from '../../reducers';

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
            <NavLink
              tag={RouterNavLink}
              activeClassName="active"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <img
                  className="img-fluid rounded-circle"
                  src={gravatarUrl(user.email, { size: 40 })}
                  alt="Gravatar"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>My Account</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
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
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout }, null, {
  pure: false,
})(TopNavigation);
