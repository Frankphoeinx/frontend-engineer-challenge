import { describe, expect, test } from "vitest";

import {
  createLogoutCookiePayloads,
  createSessionCookiePayloads,
} from "@/src/server/auth/cookies";
import { SESSION_COOKIE_NAMES } from "@/src/server/auth/cookie-names";

describe("session cookie helpers", () => {
  test("creates three session cookies with httpOnly defaults", () => {
    const cookies = createSessionCookiePayloads(
      {
        authToken: "auth-token",
        refreshToken: "refresh-token",
        sessionEmail: "user@mail.com",
      },
      false,
      new Date("2026-01-01T00:00:00.000Z"),
    );

    expect(cookies).toHaveLength(3);
    expect(cookies[0]?.name).toBe(SESSION_COOKIE_NAMES.authToken);
    expect(cookies[1]?.name).toBe(SESSION_COOKIE_NAMES.refreshToken);
    expect(cookies[2]?.name).toBe(SESSION_COOKIE_NAMES.sessionEmail);
    expect(cookies.every((cookie) => cookie.options.httpOnly)).toBe(true);
  });

  test("creates logout cookies that expire immediately", () => {
    const cookies = createLogoutCookiePayloads(true);

    expect(cookies.every((cookie) => cookie.options.expires.getTime() === 0)).toBe(true);
    expect(cookies.every((cookie) => cookie.options.secure)).toBe(true);
  });
});
