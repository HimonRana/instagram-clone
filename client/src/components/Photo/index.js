import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Photo.css";
import CommentForm from "../../containers/CommentForm";
import CommentDisplay from "../../containers/CommentDisplay";
import PostLikes from "../../containers/PostLikes";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      user: this.props.auth
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.post.comments.length !== prevState.post.comments.length ||
      nextProps.post.likes.length !== prevState.post.likes.length
    ) {
      return {
        post: nextProps.post
      };
    } else {
      return {
        post: prevState.post
      };
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post } = this.props;
    const { user } = this.props;

    const avatar = `https://api.adorable.io/avatars/100/${post.name}@adorable.png`;

    return (
      <article className="Photo__root">
        <div className="Photo-header">
          <div className="Photo-header__avatar-container">
            <img
              src={avatar}
              className="Photo-header__avatar-img rounded-circle"
              alt={`${post.name} profile`}
            />
          </div>
          <div className="Photo-header__metadata-container">
            <div className="Photo-header__username">
              <Link to={`/profile/${post.user}`}>{post.name}</Link>
            </div>
          </div>
          <div className="delete ml-auto">
            {post.user === user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, post._id)}
                type="submit"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
        <div className="Photo__body">
          <img src={post.postImg} alt="" />
        </div>
        <PostLikes post={post} user={user} />
        <div className="Photo__comments container ml-2 mr-2 mt-2">
          <ul className="m-0">
            <li className="mb-2">
              <div className="">
                <Link className="font-weight-bold" to={`/profile/${post.user}`}>
                  {post.name + ": "}
                </Link>
                {post.text}
              </div>
            </li>
            <CommentDisplay
              key={post._id}
              postId={post._id}
              comments={post.comments}
            />
          </ul>
        </div>
        <div className="Photo__footer">
          <div className="Photo-header__timestamp">
            <small>{post.date}</small>
          </div>
          <div className="Photo__action-box">
            <CommentForm key={post._id} postId={post._id} />
          </div>
        </div>
      </article>
    );
  }
}
export default Photo;
