import Api from "@/src/utils/api";
import { API_URL } from "@/src/config/constants";

export const getCities = () => {
  return Api.get({
    url: API_URL.CITIES,
    params: {},
  });
};

export const getDistricts = (params) => {
  return Api.get({
    url: API_URL.DISTRICTS,
    params,
  });
};

export const getWards = (params) => {
  return Api.get({
    url: API_URL.WARDS,
    params,
  });
};
