import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from "../constants/authConstants";

export const authReducer = (state = { isAuth: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, isAuth: action.payload };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case SIGN_IN_REQUEST:
      return { loading: true };
    case SIGN_IN_SUCCESS:
      return { loading: false, isAuth: action.payload };
    case SIGN_IN_FAIL:
      return { loading: false, error: action.payload };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
};
