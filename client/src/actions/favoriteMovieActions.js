import axios from "axios";
import { SIGN_OUT } from "../constants/authConstants";
import {
  GET_FAVORITE_MOVIES_FAIL,
  GET_FAVORITE_MOVIES_REQUEST,
  GET_FAVORITE_MOVIES_SUCCESS,
} from "../constants/favoriteMovieConstants";

/////////////////////////////////////////////////////////////////////
// This file includes queries to the users favorite movie database

export const getFavoriteMovies = (access_token) => async (dispatch) => {
  dispatch({
    type: GET_FAVORITE_MOVIES_REQUEST,
  });

  await axios
    .get("/api/favorites/", {
      headers: {
        Authorization: `Bearer: ${access_token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_FAVORITE_MOVIES_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_FAVORITE_MOVIES_FAIL,
        payload: err.response.data.message,
      });
      if (err.response.status === 401) {
        localStorage.removeItem("isAuth");
        dispatch({
          type: SIGN_OUT,
        });
      }
    });
};
