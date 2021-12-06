import { combineReducers } from "redux";
import post from "./post/reducer";
import location from "./location/reducer";
import localHolding from "./localHolding/reducer";

const rootReducer = combineReducers({ post, location, localHolding });

export default rootReducer;
