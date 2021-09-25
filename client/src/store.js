import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducers";
import { tvmazeApiReducer } from "./reducers/tvmazeApiReducer";
const initialState = {};

const reducer = combineReducers({
  isAuth: authReducer,
  movies: tvmazeApiReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
