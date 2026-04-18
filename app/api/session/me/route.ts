import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import type { ApiErrorResponse, SessionMeResponse } from "@/src/shared/lib/auth-api";
import { SESSION_COOKIE_NAMES } from "@/src/server/auth/cookie-names";
import { mapSessionError } from "@/src/server/auth/errors";
import { getCurrentUser } from "@/src/server/auth/service";

export async function GET() {
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  const authToken = cookieStore.get(SESSION_COOKIE_NAMES.authToken)?.value;
  const sessionEmail = cookieStore.get(SESSION_COOKIE_NAMES.sessionEmail)?.value;

  if (!authToken || !sessionEmail) {
    return NextResponse.json<ApiErrorResponse>(
      {
        code: "unauthorized",
        message: "Сессия недействительна",
      },
      { status: 401 },
    );
  }

  try {
    const user = await getCurrentUser(
      {
        authToken,
        sessionEmail,
      },
      requestHeaders,
    );

    return NextResponse.json<SessionMeResponse>(user);
  } catch (error) {
    const mapped = mapSessionError(error);

    return NextResponse.json<ApiErrorResponse>(mapped.body, {
      status: mapped.status,
    });
  }
}
