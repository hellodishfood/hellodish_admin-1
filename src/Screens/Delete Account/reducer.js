import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "./constants";

const INITIAL_STATE = {
  loading: false,
  error: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
