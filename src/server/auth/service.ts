import { timestampDate } from "@bufbuild/protobuf/wkt";

import { normalizeEmail, type LoginFormValues } from "@/src/shared/lib/auth-validation";
import { createAuthorizedHeaders, createForwardedHeaders } from "@/src/server/grpc/metadata";
import { createAuthCommandClient, createAuthQueryClient } from "@/src/server/grpc/transport";
import type { AuthSession } from "@/src/server/auth/cookies";

interface SessionLookupInput {
  authToken: string;
  sessionEmail: string;
}

export interface SessionUser {
  email: string;
  active: boolean;
}

export async function loginUser(
  credentials: LoginFormValues,
  requestHeaders: Headers,
): Promise<AuthSession> {
  const authClient = createAuthCommandClient();
  const response = await authClient.login(
    {
      email: credentials.email,
      password: credentials.password,
    },
    {
      headers: createForwardedHeaders(requestHeaders),
    },
  );

  return {
    authToken: response.authToken,
    refreshToken: response.refreshToken,
    sessionEmail: normalizeEmail(credentials.email),
    authExpiresAt: response.authExpiresAt
      ? timestampDate(response.authExpiresAt)
      : undefined,
    refreshExpiresAt: response.refreshExpiresAt
      ? timestampDate(response.refreshExpiresAt)
      : undefined,
  };
}

export async function getCurrentUser(
  input: SessionLookupInput,
  requestHeaders: Headers,
): Promise<SessionUser> {
  const queryClient = createAuthQueryClient();
  const response = await queryClient.getUserByEmail(
    {
      email: input.sessionEmail,
    },
    {
      headers: createAuthorizedHeaders(requestHeaders, input.authToken),
    },
  );

  return {
    email: response.email,
    active: response.active,
  };
}
