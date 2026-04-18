import { describe, expect, test } from "vitest";

import { loginFormSchema } from "@/src/features/auth/login/login-form.schema";

describe("loginFormSchema", () => {
  test("normalizes email to lowercase", () => {
    const parsed = loginFormSchema.parse({
      email: " User@Mail.Com ",
      password: "secret",
    });

    expect(parsed.email).toBe("user@mail.com");
  });

  test("requires a valid email", () => {
    const parsed = loginFormSchema.safeParse({
      email: "not-an-email",
      password: "secret",
    });

    expect(parsed.success).toBe(false);
  });

  test("requires password presence", () => {
    const parsed = loginFormSchema.safeParse({
      email: "user@mail.com",
      password: "",
    });

    expect(parsed.success).toBe(false);
  });
});
