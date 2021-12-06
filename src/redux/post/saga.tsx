import { generateSaga, generateActions } from "@/src/utils/reduxGenerator";
import { getPost, getPostDetail } from "./services";
import { takeEvery } from "redux-saga/effects";

const { GET } = generateActions("POST");
const { GET: GET_DETAIL } = generateActions("POST_DETAIL");

const { get: getPostSaga } = generateSaga({
  modelName: "POST",
  getApi: getPost,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const { get: getPostDetailSaga } = generateSaga({
  modelName: "POST_DETAIL",
  getApi: getPostDetail,
  createApi: null,
  updateApi: null,
  deleteApi: null,
});

const postSaga = [
  takeEvery(GET.GET_REQUEST, getPostSaga),
  takeEvery(GET_DETAIL.GET_REQUEST, getPostDetailSaga),
];

export default postSaga;
