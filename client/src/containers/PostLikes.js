import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike, removeLike } from "../actions/postActions";

export class PostLikes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: "Like",
      isLiked: false
    };

    this.toggleLike = this.toggleLike.bind(this);
  }

  componentDidMount() {
    this.checkLike();
  }

  checkLike() {
    const { user } = this.props;
    const { likes } = this.props.post;

    return likes.map(like => {
      like.user === user.id
        ? this.setState({
            isliked: true,
            buttonText: "Unlike"
          })
        : null;
    });
  }

  toggleLike(e) {
    const { post } = this.props;

    if (this.state.isLiked === true) {
      this.setState(
        {
          buttonText: "Like",
          isLiked: false
        },
        () => {
          this.props.removeLike(post._id);
        }
      );
    } else {
      this.setState(
        {
          buttonText: "Unlike",
          isLiked: true
        },
        () => {
          this.props.addLike(post._id);
        }
      );
    }
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        <div className="Photo__like-button ml-4 mt-2">
          <button onClick={this.toggleLike} className="btn-outline-danger">
            {this.state.buttonText}
          </button>
        </div>
        <div className="likes pl-4 pt-2">
          <p className="text-sm">{post.likes.length} Likes</p>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
// };

// const mapStateToProps = state => {
//   auth: state.auth
// }

export default connect(
  null,
  { addLike, removeLike }
)(PostLikes);
