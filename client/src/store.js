import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducers";
import { tvmazeApiReducer } from "./reducers/tvmazeApiReducer";
import { favoriteMoviesReducer } from "./reducers/favoriteMovieReducer";
const initialState = {
  isAuth: {
    isAuth: localStorage.getItem("isAuth")
      ? JSON.parse(localStorage.getItem("isAuth"))
      : null,
  },
  favoriteMovies: {
    favoriteMovies: localStorage.getItem("favoriteMovies")
      ? JSON.parse(localStorage.getItem("favoriteMovies"))
      : [],
  },
};

const reducer = combineReducers({
  isAuth: authReducer,
  movies: tvmazeApiReducer,
  favoriteMovies: favoriteMoviesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
