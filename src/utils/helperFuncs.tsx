import moment from "moment";
import { Button, notification, Space } from "antd";
import Router from "next/router";
import queryString from "query-string";

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const hidePhoneNumber = (phone) => {
  return phone && phone.slice(0, 4).concat("***");
};

export const convertCurrentcy = (number: number) => {
  if (number <= 0) {
    return "0";
  }
  if (number < 1000000000) {
    return `${number / 1000000} triệu`;
  }
  return `${number / 1000000000} tỷ`;
};

export const getRateChange = (price: number, marketPrice: number) => {
  return marketPrice ? (1 - price / marketPrice) * 100 : 0;
};

export const getTimeFromNow = (time: string) => {
  let resultEng = moment(time).fromNow();
  if (resultEng === "a few seconds ago") {
    return "5 giây trước";
  }
  if (resultEng.includes("seconds ago")) {
    return `${resultEng.slice(0, resultEng.indexOf("s"))}giây trước`;
  }
  if (resultEng === "a minute ago") {
    return "Một phút trước";
  }
  if (resultEng.includes("minutes")) {
    return `${resultEng.slice(0, resultEng.indexOf("m"))}phút`;
  }
  if (resultEng === "an hour ago") {
    return "Một giờ trước";
  }
  if (resultEng.includes("hours")) {
    return `${resultEng.slice(0, resultEng.indexOf("h"))}giờ`;
  }
  if (resultEng === "a day ago") {
    return "Một ngày trước";
  }
  if (resultEng.includes("days")) {
    if (parseInt(resultEng.slice(0, resultEng.indexOf("d") - 1)) <= 7) {
      return `${resultEng.slice(0, resultEng.indexOf("d"))}ngày trước`;
    }
    return moment(time).format("DD/MM/YYYY");
  }

  if (resultEng.includes("months")) {
    return moment(time).format("DD/MM/YYYY");
  }
  return "";
};

export const getRange = (range: string) => {
  return range
    ? {
        min: parseInt(range.replaceAll(" ", "").split("-")[0]),
        max: parseInt(range.replaceAll(" ", "").split("-")[1]),
      }
    : {};
};

export const notify = {
  error: ({ message, ...options }) =>
    notification.error({
      message,
      ...options,
    }),

  info: ({ message, ...options }) =>
    notification.info({
      message,
      ...options,
    }),

  success: ({ message, ...options }) =>
    notification.success({
      message,
      ...options,
    }),

  warning: ({ message, ...options }) =>
    notification.warning({
      message,
      ...options,
    }),
};

export const buildQueryString = ({ rootUrl, params }) => {
  let query = `${rootUrl}?`;
  for (const [key, value] of Object.entries(params)) {
    query += `${key}=${value}&`;
  }
  query = query.slice(0, -1);
  Router.replace(query);
};

export const getQueryParams = () => {
  let queryFilters = {
    property_type: null,
    city: null,
    district: null,
    ward: null,
    project_name: null,
    price: null,
    min_price: null,
    max_price: null,
    area: null,
    min_area: null,
    max_area: null,
    bed_rooms: null,
    bath_rooms: null,
    house_view: null,
    furniture: null,
    legal: null,
    price_ads: null,
    author: null,
  };
  let queryParams = queryString.parse(location.search);
  for (let [key, value] of Object.entries(queryParams)) {
    if (value) {
      queryFilters[`${key}`] = value;
    }
  }
  console.log({ queryFilters });
  return queryFilters;
};
