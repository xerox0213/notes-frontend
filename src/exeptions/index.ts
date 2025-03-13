import type {
  BasicError,
  LoginValidationError,
  RegistrationError,
} from "../types";

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
  reason: LoginValidationError;

  constructor(reason: LoginValidationError) {
    this.reason = reason;
  }
}

export class UnauthenticatedException {
  reason: BasicError;

  constructor(reason: BasicError) {
    this.reason = reason;
  }
}

export class InvalidLoginException {
  reason: BasicError;

  constructor(reason: BasicError) {
    this.reason = reason;
  }
}
