import { API_URL, getOptionsApi } from "../utils";

export const initSession = async () => {
  await fetch(`${API_URL}/sanctum/csrf-cookie`);
};

export const getUser = async (): Promise<Response> => {
  return await fetch(`${API_URL}/api/user`, getOptionsApi());
};
