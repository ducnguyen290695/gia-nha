import { generateReducer } from "@/src/utils/reduxGenerator";
import { combineReducers } from "redux";

const { get } = generateReducer("LOCAL_HOLDING");

const localHolding = combineReducers({ get });

export default localHolding;
