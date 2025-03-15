import {
  CsrfMismatchException,
  InvalidLoginException,
  LoginValidationException,
  RegistrationValidationException,
  UnauthenticatedException,
} from "../exceptions";
import type { LoginSchema } from "../pages/LoginPage.vue";
import type { RegistrationSchema } from "../pages/RegisterPage.vue";
import type { User } from "../types";
import { API_URL, options } from "../utils";

export const initSession = async () => {
  await fetch(`${API_URL}/sanctum/csrf-cookie`, options());
};

export const getUser = async (): Promise<User> => {
  const res = await fetch(`${API_URL}/api/user`, options("GET"));

  if (!res.ok) {
    switch (res.status) {
      case 401:
        return Promise.reject(new UnauthenticatedException(await res.json()));
      case 419:
        return Promise.reject(new CsrfMismatchException(await res.json()));
    }
  }

  return res.json();
};

export const register = async (credentials: RegistrationSchema) => {
  const res = await fetch(
    `${API_URL}/api/register`,
    options("POST", credentials),
  );

  if (!res.ok) {
    switch (res.status) {
      case 419:
        return Promise.reject(new CsrfMismatchException(await res.json()));
      case 422:
        return Promise.reject(
          new RegistrationValidationException(await res.json()),
        );
    }
  }
};

export const login = async (credentials: LoginSchema) => {
  const res = await fetch(`${API_URL}/api/login`, options("POST", credentials));

  if (!res.ok) {
    switch (res.status) {
      case 401:
        return Promise.reject(new InvalidLoginException(await res.json()));
      case 419:
        return Promise.reject(new CsrfMismatchException(await res.json()));
      case 422:
        return Promise.reject(new LoginValidationException(await res.json()));
    }
  }
};
