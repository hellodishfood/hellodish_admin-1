import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "./constants";

export const loginRequest = (email, password, OnSuccess, OnFail) => ({
  type: LOGIN_REQUEST,
  email,
  password,
  OnSuccess,
  OnFail,
});

export const loginSuccess = (error) => ({
  type: LOGIN_SUCCESS,
  error,
});
export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error,
});
