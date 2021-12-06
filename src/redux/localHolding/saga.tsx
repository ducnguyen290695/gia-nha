import { generateSaga, generateActions } from "@/src/utils/reduxGenerator";
import { getLocalHolding } from "./services";
import { takeEvery } from "redux-saga/effects";

const { GET } = generateActions("LOCAL_HOLDING");

const { get: getLocalHoldingSaga } = generateSaga({
  modelName: "LOCAL_HOLDING",
  getApi: getLocalHolding,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const localHoldingSaga = [takeEvery(GET.GET_REQUEST, getLocalHoldingSaga)];

export default localHoldingSaga;
