import {
  GET_MOVIES_FAIL,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  SEARCH_BY_MOVIE_TITLE_FAIL,
  SEARCH_BY_MOVIE_TITLE_REQUEST,
  SEARCH_BY_MOVIE_TITLE_SUCCESS,
} from "../constants/tvmazeApiConstants";
import axios from "axios";

/////////////////////////////////////////////////////////////////////
// This file includes queries to TVMaze API

export const searchByMovieTitle = (title) => async (dispatch) => {
  dispatch({
    type: SEARCH_BY_MOVIE_TITLE_REQUEST,
  });
  await axios
    .get(`https://api.tvmaze.com/search/shows?q=${title}`)
    .then((res) => {
      let handleData = res.data.map((item) => {
        return item.show;
      });
      dispatch({
        type: SEARCH_BY_MOVIE_TITLE_SUCCESS,
        payload: handleData,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_BY_MOVIE_TITLE_FAIL,
        payload: err.response.data.message,
      });
    });
};

export const getMovies = () => async (dispatch) => {
  dispatch({
    type: GET_MOVIES_REQUEST,
  });
  await axios
    .get(`https://api.tvmaze.com/shows`)
    .then((res) => {
      dispatch({
        type: GET_MOVIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MOVIES_FAIL,
        payload: err.response.data.message,
      });
    });
};
