import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from "../constants/authConstants";
import axios from "axios";
import { REMOVE_FAVORITE_MOVIES } from "../constants/favoriteMovieConstants";

/////////////////////////////////////////////////////////////////////
// This file includes queries to the customer authorization database

export const register = (registerData) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  await axios
    .post("/api/auth/register", registerData)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      })
    );
};

export const signIn = (signInData) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_REQUEST,
  });
  await axios
    .post("/api/auth/sign-in", signInData)
    .then((res) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("isAuth", JSON.stringify(res.data));
    })
    .catch((err) =>
      dispatch({
        type: SIGN_IN_FAIL,
        payload: err.response.data.message,
      })
    );
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("isAuth");
  dispatch({
    type: SIGN_OUT,
  });
  dispatch({
    type: REMOVE_FAVORITE_MOVIES,
  });
};
