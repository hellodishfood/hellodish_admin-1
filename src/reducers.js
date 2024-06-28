import { combineReducers } from "redux";
import LoginReducer from "./Screens/Login/reducer";

const allReducers = combineReducers({
  LoginReducer,
});
export default allReducers;
