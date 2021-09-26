import {
  GET_FAVORITE_MOVIES_FAIL,
  GET_FAVORITE_MOVIES_REQUEST,
  GET_FAVORITE_MOVIES_SUCCESS,
  REMOVE_FAVORITE_MOVIES,
} from "../constants/favoriteMovieConstants";
export const favoriteMoviesReducer = (
  state = { favoriteMovies: [] },
  action
) => {
  switch (action.type) {
    case GET_FAVORITE_MOVIES_REQUEST:
      return { loading: true };
    case GET_FAVORITE_MOVIES_SUCCESS:
      return { loading: false, favoriteMovies: action.payload };
    case GET_FAVORITE_MOVIES_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_FAVORITE_MOVIES:
      return { loading: false, favoriteMovies: [] };

    default:
      return state;
  }
};
