import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CsrfMismatchException,
  InvalidLoginException,
  LoginValidationException,
  RegistrationValidationException,
} from "../exceptions";
import * as utils from "../utils";
import { login, register } from "./auth";

const options = {};
const optionsSpy = vi.spyOn(utils, "options").mockReturnValue(options);

afterEach(() => {
  optionsSpy.mockClear();
  vi.unstubAllGlobals();
});

describe("register", () => {
  const credentials = {
    first_name: "Damon",
    last_name: "Salvatore",
    email: "damon.salvatore@gmail.com",
    password: "iloveyouelena",
  };
  const endpoint = `${utils.API_URL}/api/register`;

  it("should register", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 204,
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    await register(credentials);

    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw csrf mismatch exception", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 419,
        json: () => Promise.resolve(),
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(register(credentials)).rejects.instanceOf(
      CsrfMismatchException,
    );
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw registration validation exception", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve(),
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(register(credentials)).rejects.toBeInstanceOf(
      RegistrationValidationException,
    );
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw type error exception", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError());
    vi.stubGlobal("fetch", fetchMock);

    await expect(register(credentials)).rejects.instanceOf(TypeError);
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });
});

describe("login", () => {
  const credentials = {
    email: "damon.salvatore@gmail.com",
    password: "iloveyouelena",
  };

  const endpoint = `${utils.API_URL}/api/login`;

  it("should login", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 204,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await login(credentials);

    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw invalid login exception", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve(),
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(login(credentials)).rejects.instanceOf(InvalidLoginException);
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw csrf mismatch exception", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 419,
        json: () => Promise.resolve(),
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(login(credentials)).rejects.instanceOf(CsrfMismatchException);
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw login validation excpetion", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve(),
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(login(credentials)).rejects.instanceOf(
      LoginValidationException,
    );
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });

  it("should throw type error exception", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError());
    vi.stubGlobal("fetch", fetchMock);

    await expect(login(credentials)).rejects.instanceOf(TypeError);
    expect(optionsSpy).toHaveBeenCalledWith("POST", credentials);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, options);
  });
});
