import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getProfileById } from "../actions/profileActions";
import { PhotoGrid } from "./PhotoGrid";
import Spinner from "../components/common/Spinner";
import "./ProfileInfo.css";

class OtherUser extends Component {
  componentDidMount() {
    this.props.getProfileById();
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    console.log(this.props);
    const avatar = `https://api.adorable.io/avatars/100/${
      "profile"
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
                className="profileAvatar rounded-circle "
                alt=""
              />
            </div>
            <div className="col-6 d-flex align-items-center">
              <div className="profileContent">
                <div className="row mb-2 p-3">
                  <h4 className="userName">{"profile"}</h4>
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

OtherUser.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(OtherUser);
