import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import "./style.css";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const avatar = `https://api.adorable.io/avatars/100/${
      user.name
    }@adorable.png`;

    const authLinks = (
      <div className="Header__container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h1 className="Header__logo">
            <Link to="/home" className="Header__logo-link">
              <i
                className="fab fa-instagram Header__instagram-icon mr-2"
                aria-hidden="true"
              />
              Buntstagram
            </Link>
          </h1>
        </div>
        <nav className="nav">
          <ul className="Header__nav-group d-flex align-items-center">
            <li className="Header__nav-link">
              <Link title="Create Post" to="/createpost">
              <i className="fas fa-plus-circle"></i>
              </Link>
            </li>
            <li className="Header__nav-link">
              <Link title="Explore" to="/explore">
                <i className="far fa-compass" />
              </Link>
            </li>
            <li className="Header__nav-link">
              <Link title="Users" to="/profiles">
                <i className="fas fa-users" />
              </Link>
            </li>
            <li className="Header__nav-link">
              <Link title="Profile" to="/profile">
                <i className="fas fa-user" />
              </Link>
            </li>
            <li className="Header__nav-link">
              <a
                href=""
                onClick={this.onLogoutClick.bind(this)}
                className="nav-link"
              >
                <img className="avatar" src={avatar} alt={user.name} /> Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );

    const guestLinks = (
      <div className="Header__container">
        <div className="d-flex align-items-center">
          <h1 className="Header__logo">
            <Link to="/" className="Header__logo-link">
              <i
                className="fab fa-instagram Header__instagram-icon mr-2"
                aria-hidden="true"
              />
              Buntstagram
            </Link>
          </h1>
        </div>
      </div>
    );

    return (
      <header className="Header__root">
        <div className="gradient" />
        {isAuthenticated ? authLinks : guestLinks}
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
