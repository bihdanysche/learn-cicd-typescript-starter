import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";
import { describe, expect, test } from "vitest";

describe("getApiKey", () => {
  test("not auth token in headers", () => {
    const headers: IncomingHttpHeaders = {};
    const result = getAPIKey(headers);
    // expect(result).toBeNull(); *Temporaly break*
    expect(result).toBeNaN();
  });

  test("not-fully auth token", () => {
    const auth = "123";
    const headers: IncomingHttpHeaders = {
      authorization: auth,
    };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("incorrect auth token", () => {
    const auth = "NotApiKey BshsbJSjacmsaOzx";
    const headers: IncomingHttpHeaders = {
      authorization: auth,
    };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("correct auth token", () => {
    const token = "BshsbJSjacmsaOzx";
    const auth = "ApiKey " + token;
    const headers: IncomingHttpHeaders = {
      authorization: auth,
    };
    const result = getAPIKey(headers);
    expect(result).toBe(token);
  });
});
