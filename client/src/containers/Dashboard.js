import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getCurrentProfile,
  createProfile,
  deleteAccount
} from "../actions/profileActions";
import isEmpty from "../validation/is-empty";
import "./SignUpForm.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      bio: "",
      imgUrl: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.imgUrl = !isEmpty(profile.imgUrl) ? profile.imgUrl : "";
      
      this.setState({
        bio: profile.bio,
        imgUrl: profile.imgUrl
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      bio: this.state.bio,
      imgUrl: this.state.imgUrl
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    return (
      <div>
        <p className="lead font-weight-bold"> Edit Profile</p>
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control-lg"
            placeholder="Short bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
          />
          <br/>
          <input
            className="form-control-lg"
            placeholder="Profile image URL here"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.onChange}
          />
          <button type="submit" value="Submit" className="btn-primary bioButton mt-4">
            {" "}
            Submit
          </button>
        </form>
        <h5 className="mt-3 mb-4">
          <strong>Remove Account permanently</strong>
        </h5>
        <button onClick={this.onDeleteClick.bind(this)} className="btn-danger">
          Delete Account
        </button>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile, deleteAccount }
)(withRouter(Dashboard));
