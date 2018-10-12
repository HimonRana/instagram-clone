import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getPosts,
  deletePost,
  addLike,
  removeLike
} from "../actions/postActions";

import { Photo } from "../components";
import PhotoGrid from "./PhotoGrid";
import Spinner from "../components/common/Spinner";

class PhotoFeed extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  deletePost(Id) {
    this.props.deletePost(Id);
  }

  render() {
    const { posts, loading } = this.props;
    const { user } = this.props.auth;
    let postContent;

    if (loading) {
      postContent = <Spinner />;
    } else {
      postContent = posts.map((post, index) => (
        <Photo
          key={index}
          post={post}
          user={user}
          deletePost={this.deletePost}
        />
      ));
    }

    return <div>{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost, addLike, removeLike }
)(PhotoFeed);
