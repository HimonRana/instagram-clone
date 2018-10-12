import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Users from "./Users";
import Spinner from "../components/common/Spinner";
import { getUsers } from "../actions/profileActions";

export class Profiles extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, loading } = this.props.profile;
    let profileItems;
    // console.log(this.props.profile);

    if (loading) {
      profileItems = <Spinner />;
    } else {
      if (users.length > 0) {
        profileItems = users.map(profile => (
          <Users key={profile._id} profile={profile} />));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center mb-4">Buntstagram Profiles</h1>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getUsers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Profiles);
