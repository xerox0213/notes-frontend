import Cookies from "js-cookie";
import { describe, expect, it, vi } from "vitest";

import { options } from ".";

describe("options", () => {
  it("should return the options", () => {
    const spy = vi.spyOn(Cookies, "get");
    const method = "POST";
    const body = { a: "hello" };
    const expectedOptions = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };

    const resultOptions = options(method, body);

    expect(spy).toHaveBeenCalledWith("XSRF-TOKEN");
    expect(resultOptions).toEqual(expectedOptions);
  });
});
