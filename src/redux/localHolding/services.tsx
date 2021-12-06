import Api from "@/src/utils/api";
import { API_URL } from "@/src/config/constants";

export const getLocalHolding = (params) => {
  return Api.get({
    url: `${API_URL.POST}/${params.id}/specialists`,
    params,
  });
};
