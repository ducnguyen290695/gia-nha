import { generateReducer } from "@/src/utils/reduxGenerator";
import { combineReducers } from "redux";

const { get } = generateReducer("POST");
const { get: getDetail } = generateReducer("POST_DETAIL");

const post = combineReducers({
  get,
  getDetail,
});

export default post;
