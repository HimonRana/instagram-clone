import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import classnames from "classnames";
import { loginUser } from "../actions/authActions";
import "./SignInForm.css";

export class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/explore");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    // .then(() => {
    //   this.props.history.push("/");
    // });
  }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.dispatch(registerUser(this.state)).then(() => {
  //     this.props.history.push('/signin');
  //   });

  render() {
    const { errors } = this.state;

    const { isAuthenticating } = this.props;

    const avatar = `https://api.adorable.io/avatars/100/${Math.random()}@adorable.png`;

    return (
      <div className="signInDiv">
        <div className="signInBox">
          <img src={avatar} className="userAvatar" alt="Avatar" />
          <form
            noValidate
            className="SignInForm__root"
            onSubmit={this.handleSubmit}
          >
            <h2>Log in here</h2>
            {errors.email && (
              <div className="SignInForm__error-text">{errors.email}</div>
            )}
            <input
              type="email"
              className={classnames("email", {
                "SignInForm__error-line": errors.email
              })}
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {errors.password && (
              <div className="SignInForm__error-text">{errors.password}</div>
            )}
            <input
              type="password"
              className={classnames("password", {
                "SignInForm__error-line": errors.password
              })}
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="logInBtn"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <i className="fas fa-spinner fa-pulse fa-3x fa-fw SignInForm__spinner" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/SignUp">Don't have an account? Sign up!</Link>
          </form>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(SignInForm));
