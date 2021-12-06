import { generateSaga, generateActions } from "@/src/utils/reduxGenerator";
import { getCities, getDistricts, getWards } from "./services";
import { takeEvery } from "redux-saga/effects";

const { GET: GET_CITIES } = generateActions("CITIES");
const { GET: GET_DISTRICTS } = generateActions("DISTRICTS");
const { GET: GET_WARDS } = generateActions("WARDS");

const { get: getCitiesSaga } = generateSaga({
  modelName: "CITIES",
  getApi: getCities,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const { get: getDistrictsSaga } = generateSaga({
  modelName: "DISTRICTS",
  getApi: getDistricts,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const { get: getWardsSaga } = generateSaga({
  modelName: "WARDS",
  getApi: getWards,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const locationSaga = [
  takeEvery(GET_CITIES.GET_REQUEST, getCitiesSaga),
  takeEvery(GET_DISTRICTS.GET_REQUEST, getDistrictsSaga),
  takeEvery(GET_WARDS.GET_REQUEST, getWardsSaga),
];

export default locationSaga;
