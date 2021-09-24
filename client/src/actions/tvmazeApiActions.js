import {
  SEARCH_BY_MOVIE_TITLE_REQUEST,
  SEARCH_BY_MOVIE_TITLE_SUCCESS,
} from "../constants/tvmazeApiConstants";
import axios from "axios";

const TVMAZE_API = "https://api.tvmaze.com";

export const searchByMovieTitle = (title) => async (dispatch) => {
  dispatch({
    type: SEARCH_BY_MOVIE_TITLE_REQUEST,
  });
  await axios
    .get(`${TVMAZE_API}/search/shows?q=${title}`)
    .then((res) => {
      dispatch({
        type: SEARCH_BY_MOVIE_TITLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
