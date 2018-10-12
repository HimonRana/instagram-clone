import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Users extends Component {
  render() {
    const { profile } = this.props;
    console.log(this.props);

    const avatar = `https://api.adorable.io/avatars/100/${
      profile.user.name
    }@adorable.png`;

    return (
      <div className="card card-body bg-light mb-3 ">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <img src={(profile === null || profile.imgUrl === "") ? avatar : profile.imgUrl} alt="" className="rounded-circle profileAvatar" />
          </div>
          <div className="col-6 profileContent">
            <h4 className="mb-2">{profile.user.name}</h4>
            <Link to={`/profile/${profile._id}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Users;
