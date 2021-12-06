import { generateReducer } from "@/src/utils/reduxGenerator";
import { combineReducers } from "redux";

const { get: cities } = generateReducer("cities");
const { get: districts } = generateReducer("districts");
const { get: wards } = generateReducer("wards");

const location = combineReducers({
  cities,
  districts,
  wards,
});

export default location;
