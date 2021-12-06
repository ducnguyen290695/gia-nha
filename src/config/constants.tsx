export const INPUT_TYPE = {
  SELECT: "SELECT",
};

export const PAGE_SIZE_LIST = ["10", "20", "50", "100", "500", "1000"];

export const REGEX = {
  NUMBER: new RegExp("^[0-9]+$"),
  PHONE: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
};

export const MODAL_TYPE = {
  REGISTER: "REGISTER",
  SEARCH: "SEARCH",
  DETAIL: "DETAIL",
};

export const API_URL = {
  // BASE_URL: "https://backend-fe2hf2ic6q-as.a.run.app",
  BASE_URL: "https://gianha-gateway-82mrgtgg.an.gateway.dev",
  POST: "/api/v1/posts",
  CITIES: "/api/v1/locations/cities",
  DISTRICTS: "/api/v1/locations/districts",
  WARDS: "/api/v1/locations/wards",
  PROJECTS: "/api/v1/projects",
  REGISTER: "/api/v1/users/register",
  LOCAL_HOLDING: "/api/v1/users/register",
  CATEGORIES: "/api/v1/categories",
};

export const KEY = "AIzaSyCZz4fs9Gm8qDvUCgzNWB8cPmA70futpIs";
