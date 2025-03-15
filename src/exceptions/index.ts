import type {
  BasicError,
  LoginValidationError,
  RegistrationValidationError,
} from "../types";

export class CsrfMismatchException {
  reason: BasicError;

  constructor(error: BasicError) {
    this.reason = error;
  }
}

export class RegistrationValidationException {
  reason: RegistrationValidationError;

  constructor(errors: RegistrationValidationError) {
    this.reason = errors;
  }
}

export class LoginValidationException {
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
