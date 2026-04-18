import { NextResponse } from "next/server";

import { createLogoutCookiePayloads } from "@/src/server/auth/cookies";
import { isSecureCookieContext } from "@/src/server/auth/env";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  for (const cookie of createLogoutCookiePayloads(isSecureCookieContext())) {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  }

  return response;
}
