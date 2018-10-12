import axios from "axios";

import {
  ADD_POST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  GET_POSTS,
  GET_POST,
  ADD_COMMENT_SUCCESS,
  POST_LOADING,
  DELETE_POST,
  DELETE_COMMENT,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAIL,
  GET_ERRORS
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios.post("/posts", postData).then(res =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  return axios
    .get("/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios.post(`/posts/comment/${postId}`, commentData).then(res => {
    let postId = res.data._id;
    let comment = commentData;

    return dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: {
        postId: postId,
        comment: comment
      }
    });
  });
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Comment Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  if (window.confirm("Are you sure, you want to delete this Post?")) {
  axios
    .delete(`/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/posts/like/${id}`, {})
    .then(res =>
      dispatch({
        type: ADD_LIKE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADD_LIKE_FAIL,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/posts/unlike/${id}`, {})
    .then(res =>
      dispatch({
        type: DELETE_LIKE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_LIKE_FAIL,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
