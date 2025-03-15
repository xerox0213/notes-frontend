import { describe, expect, it, vi } from "vitest";

import {
  CsrfMismatchException,
  RegistrationValidationException,
} from "../exceptions";
import * as utils from "../utils";
import { register } from "./auth";

const options = {};
const optionsSpy = vi.spyOn(utils, "options").mockReturnValue(options);

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
});
