import { NextRequest, NextResponse } from "next/server";

import { loginFormSchema } from "@/src/shared/lib/auth-validation";
import type {
  LoginApiSuccessResponse,
  ApiErrorResponse,
} from "@/src/shared/lib/auth-api";
import { createSessionCookiePayloads } from "@/src/server/auth/cookies";
import { isSecureCookieContext } from "@/src/server/auth/env";
import { mapLoginError } from "@/src/server/auth/errors";
import { loginUser } from "@/src/server/auth/service";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      {
        code: "validation_error",
        message: "Проверьте введённые данные",
      },
      { status: 400 },
    );
  }

  const parsed = loginFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json<ApiErrorResponse>(
      {
        code: "validation_error",
        message: parsed.error.issues[0]?.message ?? "Проверьте введённые данные",
      },
      { status: 400 },
    );
  }

  try {
    const session = await loginUser(parsed.data, request.headers);
    const response = NextResponse.json<LoginApiSuccessResponse>({
      ok: true,
      redirectTo: "/account",
    });

    for (const cookie of createSessionCookiePayloads(
      session,
      isSecureCookieContext(),
    )) {
      response.cookies.set(cookie.name, cookie.value, cookie.options);
    }

    return response;
  } catch (error) {
    const mapped = mapLoginError(error);

    return NextResponse.json<ApiErrorResponse>(mapped.body, {
      status: mapped.status,
    });
  }
}
