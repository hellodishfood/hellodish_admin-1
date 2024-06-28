import { all } from "redux-saga/effects";
import LoginSaga from "./Screens/Login/saga";

export default function* rootSaga() {
  yield all([LoginSaga()]);
}
