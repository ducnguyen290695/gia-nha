import Api from "@/src/utils/api";
import { API_URL } from "@/src/config/constants";

export const getPost = (params) => {
  return Api.get({
    url: API_URL.POST,
    params,
  });
};

export const getPostDetail = (payload) => {
  const { id, params } = payload;
  return Api.get({
    url: `${API_URL.POST}/${id}`,
    params,
  });
};
