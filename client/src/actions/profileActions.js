import axios from "axios";
import { logoutUser } from "./authActions";

import {
  GET_PROFILE,
  GET_USERS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";


// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      });
    });
};

// Get profile by id
export const getProfileById = (id) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data
      })
    );
};

// Get all users
export const getUsers = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/profile/all')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .put("/profile", profileData)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure, you want to delete this Account?")) {
    axios
      .delete("/profile")
      .then(res => dispatch(logoutUser()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.respones.data
        })
      );
  }
};

// Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: {}
  };
};
