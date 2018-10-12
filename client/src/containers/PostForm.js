import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../actions/postActions";
import { getCurrentProfile } from "../actions/profileActions";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      postImg: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { profile } = this.props.profile;

    const postData = {
      name: profile.user.name,
      profileImg: profile.imgUrl,
      text: this.state.text,
      postImg: this.state.postImg
    };

    this.props.addPost(postData);
    this.setState({ text: "", postImg: "" });
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="container">
        <h2 className="p-3"> Create a post</h2>
        <form onSubmit={this.onSubmit}>
          <input
            className="form-control-lg mt-4"
            placeholder="Image URL here"
            name="postImg"
            value={this.state.postImg}
            onChange={this.onChange}
          />
          <textarea
            className="form-control-lg"
            placeholder="Description"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <br />
          <button
            type="submit"
            value="Submit"
            className="btn-primary bioButton mt-4 ml-3"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPost, getCurrentProfile }
)(withRouter(PostForm));
