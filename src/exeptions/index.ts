import type { BasicError, LoginError, RegistrationError } from "../types";

export class CsrfMismatchException {
  reason: BasicError;

  constructor(error: BasicError) {
    this.reason = error;
  }
}

export class RegistrationException {
  reason: RegistrationError;

  constructor(errors: RegistrationError) {
    this.reason = errors;
  }
}

export class LoginException {
  reason: LoginError;

  constructor(reason: LoginError) {
    this.reason = reason;
  }
}
