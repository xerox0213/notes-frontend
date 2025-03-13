import { CsrfMismatchException, RegistrationException } from "../exeptions";
import type { RegistrationSchema } from "../pages/RegisterPage.vue";
import { API_URL, options } from "../utils";

export const initSession = async () => {
  await fetch(`${API_URL}/sanctum/csrf-cookie`, options());
};

export const getUser = async (): Promise<Response> => {
  return await fetch(`${API_URL}/api/user`, options("GET"));
};

export const register = async (credentials: RegistrationSchema) => {
  await initSession();

  const res = await fetch(
    `${API_URL}/api/register`,
    options("POST", credentials),
  );

  if (!res.ok) {
    switch (res.status) {
      case 419:
        return Promise.reject(new CsrfMismatchException(await res.json()));
      case 422:
        return Promise.reject(new RegistrationException(await res.json()));
    }
  }
};
