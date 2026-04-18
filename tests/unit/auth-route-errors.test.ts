import { Code, ConnectError } from "@connectrpc/connect";
import { describe, expect, test } from "vitest";

import { mapLoginError, mapSessionError } from "@/src/server/auth/errors";

describe("mapLoginError", () => {
  test("maps unauthenticated to invalid credentials", () => {
    const result = mapLoginError(new ConnectError("bad credentials", Code.Unauthenticated));

    expect(result.status).toBe(401);
    expect(result.body.code).toBe("invalid_credentials");
  });

  test("maps resource exhausted to rate limited", () => {
    const result = mapLoginError(new ConnectError("slow down", Code.ResourceExhausted));

    expect(result.status).toBe(429);
    expect(result.body.code).toBe("rate_limited");
  });

  test("maps unknown failures to unavailable", () => {
    const result = mapLoginError(new Error("boom"));

    expect(result.status).toBe(503);
    expect(result.body.code).toBe("unavailable");
  });
});

describe("mapSessionError", () => {
  test("maps unauthenticated session to unauthorized", () => {
    const result = mapSessionError(new ConnectError("expired", Code.Unauthenticated));

    expect(result.status).toBe(401);
    expect(result.body.code).toBe("unauthorized");
  });
});
