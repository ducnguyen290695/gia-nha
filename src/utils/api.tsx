import axios from "axios";
import { API_URL, KEY } from "../config/constants";

const getHeaders = () => {
  return {
    Accept: "application/json",
    "content-type": "application/json",
  };
};

function getApi({ url, params, ...options }) {
  return axios({
    method: "GET",
    url: url,
    params: {
      key: KEY,
      ...params,
    },
    baseURL: API_URL.BASE_URL,
    headers: { ...getHeaders() },
    ...options,
  });
}

function postApi({ url, payload, ...options }) {
  return axios({
    method: "POST",
    url: url,
    baseURL: API_URL.BASE_URL,
    data: payload,
    headers: { ...getHeaders() },
    ...options,
  });
}

function postApiUpload({ url, payload, ...options }) {
  return axios({
    method: "POST",
    url: url,
    baseURL: API_URL.BASE_URL,
    params: {
      key: KEY,
    },
    data: payload,
    headers: { ...getHeaders(), "Content-Type": "multipart/form-data" },
    ...options,
  });
}

function putApi({ url, payload, ...options }) {
  return axios({
    method: "PUT",
    url: url,
    data: payload,
    headers: { ...getHeaders() },
    ...options,
  });
}

function patchApi({ url, payload, ...options }) {
  return axios({
    method: "PATCH",
    url: url,
    data: payload,
    headers: { ...getHeaders() },
    ...options,
  });
}

function deleteApi({ url, ...options }) {
  return axios({
    method: "DELETE",
    url: url,
    headers: { ...getHeaders() },
    ...options,
  });
}

const Api = {
  get: getApi,
  post: postApi,
  postUpload: postApiUpload,
  put: putApi,
  delete: deleteApi,
  patch: patchApi,
};

export { getHeaders };
export default Api;
