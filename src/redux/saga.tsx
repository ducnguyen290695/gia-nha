import { all } from "redux-saga/effects";
import postSaga from "./post/saga";
import locationSaga from "./location/saga";
import localHoldingSaga from "./localHolding/saga";

function* rootSaga() {
  yield all([...postSaga, ...locationSaga, ...localHoldingSaga]);
}

export default rootSaga;
