import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { getCurrentProfile, getProfileById } from "../actions/profileActions";
import { PhotoGrid } from "./PhotoGrid";
import Spinner from "../components/common/Spinner";
import "./ProfileInfo.css";
class ProfileInfo extends Component {
  constructor() {
    super();

    this.state = {
      bio: "",
      imageUrl: ""
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    // console.log(this.props.match);

    if (this.props.match.params._id) {
      this.props.getProfileById(this.props.match.params._id);
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log(this.props);


    const avatar = `https://api.adorable.io/avatars/100/${
      user.name
    }@adorable.png`;

    let profileContent;
    let spinner = <Spinner />;

    if (loading) {
      profileContent = spinner;
    } else {
      profileContent = (
        <div>
          <div className="infoProfile row d-flex flex-nowrap">
            <div className="imgUrl col-6 d-flex justify-content-center">
              <img
                src={(profile === null || profile.imgUrl === "") ? avatar : profile.imgUrl}
                className="profileAvatar rounded-circle"
                alt=""
              />
            </div>
            <div className="col-6 d-flex align-items-center">
              <div className="profileContent">
                <div className="row mb-2 p-3">
                  <h4 className="userName">{user.name}</h4>
                  <Link
                    title="Dashboard"
                    to="/dashboard"
                    className="ml-4 d-flex align-items-center"
                  >
                    <i className="fas fa-cog" />
                  </Link>
                </div>
                <hr />
                <h6>{profile == null ? "" : profile.bio}</h6>
              </div>
            </div>
          </div>
          <PhotoGrid />
        </div>
      );
    }

    return <div className="container mt-5">{profileContent}</div>;
  }
}
ProfileInfo.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post.posts,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getProfileById }
)(withRouter(ProfileInfo));
