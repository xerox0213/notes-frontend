import Cookies from "js-cookie";

export const API_URL = import.meta.env.API_URL;

export const getOptionsApi = (method: string = "GET"): RequestInit => {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": Cookies.get("X-XSRF-TOKEN") ?? "",
    },
    credentials: "include",
  };
};
