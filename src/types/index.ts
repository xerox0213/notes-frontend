import type { LoginSchema } from "../pages/LoginPage.vue";
import type { RegistrationSchema } from "../pages/RegisterPage.vue";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export type BasicError = { message: string };

export type RegistrationError = BasicError & {
  errors: Partial<{
    [K in keyof RegistrationSchema]: string[];
  }>;
};

export type LoginValidationError = BasicError & {
  errors: Partial<{
    [K in keyof LoginSchema]: string[];
  }>;
};
