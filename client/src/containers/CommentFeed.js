import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentDisplay from "./CommentDisplay";

class CommentFeed extends Component {


  render() {
    const { comments, postId } = this.props;
    console.log(comments);
    return comments.map(comment => (
      <CommentDisplay key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentFeed.propTypes = {
  comment: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentFeed;
