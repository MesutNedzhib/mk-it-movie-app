import {
  SEARCH_BY_MOVIE_TITLE_FAIL,
  SEARCH_BY_MOVIE_TITLE_REQUEST,
  SEARCH_BY_MOVIE_TITLE_SUCCESS,
} from "../constants/tvmazeApiConstants";
export const tvmazeApiReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case SEARCH_BY_MOVIE_TITLE_REQUEST:
      return { loading: true };
    case SEARCH_BY_MOVIE_TITLE_SUCCESS:
      return { loading: false, movies: action.payload };
    case SEARCH_BY_MOVIE_TITLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
