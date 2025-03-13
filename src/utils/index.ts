import Cookies from "js-cookie";

export const API_URL = import.meta.env.VITE_API_URL;

export const options = (method?: string, body?: object | []): RequestInit => {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? "",
    },
    body: JSON.stringify(body),
    credentials: "include",
  };
};
