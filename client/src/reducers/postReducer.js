import {
  ADD_POST,
  ADD_LIKE_SUCCESS,
  GET_POSTS,
  DELETE_POST,
  DELETE_COMMENT,
  DELETE_LIKE_SUCCESS,
  POST_LOADING,
  ADD_COMMENT_SUCCESS
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (action.payload.postId === post._id) {
            post.comments = [...post.comments, action.payload.comment];
          }
          return post;
        }),
        loading: false
      };
    case DELETE_LIKE_SUCCESS:
    case ADD_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (action.payload._id === post._id) {
            post = action.payload;
          }
          return post;
        }),
        loading: false
      };
    case DELETE_COMMENT:
      console.log(state.posts.filter(post => console.log(post)));
      return {
        ...state,
        posts: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
