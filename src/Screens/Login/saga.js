import { takeEvery, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "./constants";
import axios from "axios";
import { LoginApi } from "../../Utilities/Api";

function* onLoginRequested({ email, password, OnSuccess, OnFail }) {
  try {
    const Data = yield call(axios.post, LoginApi, {
      key: email,
      password: password,
    });
    console.log(Data.data);
    if (Data.data.success == true) {
      yield put({ type: LOGIN_SUCCESS });
      OnSuccess(Data.data);
    } else {
      yield put({ type: LOGIN_FAIL, error: Data.data.message });
      OnFail(Data.data.message);
    }
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error: "something went wrong !" });
    OnFail("something went wrong");
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN_REQUEST, onLoginRequested);
}
export default sagaLogin;
