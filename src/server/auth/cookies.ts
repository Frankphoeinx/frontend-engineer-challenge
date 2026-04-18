import { SESSION_COOKIE_NAMES } from "@/src/server/auth/cookie-names";

const FALLBACK_AUTH_TTL_MS = 15 * 60 * 1000;
const FALLBACK_REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface AuthSession {
  authToken: string;
  refreshToken: string;
  sessionEmail: string;
  authExpiresAt?: Date;
  refreshExpiresAt?: Date;
}

interface SessionCookiePayload {
  name: string;
  value: string;
  options: {
    expires: Date;
    httpOnly: true;
    sameSite: "lax";
    secure: boolean;
    path: "/";
  };
}

export function createSessionCookiePayloads(
  session: AuthSession,
  secure: boolean,
  now = new Date(),
): SessionCookiePayload[] {
  const authExpiresAt =
    session.authExpiresAt ?? new Date(now.getTime() + FALLBACK_AUTH_TTL_MS);
  const refreshExpiresAt =
    session.refreshExpiresAt ??
    new Date(now.getTime() + FALLBACK_REFRESH_TTL_MS);

  return [
    {
      name: SESSION_COOKIE_NAMES.authToken,
      value: session.authToken,
      options: {
        expires: authExpiresAt,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
    {
      name: SESSION_COOKIE_NAMES.refreshToken,
      value: session.refreshToken,
      options: {
        expires: refreshExpiresAt,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
    {
      name: SESSION_COOKIE_NAMES.sessionEmail,
      value: session.sessionEmail,
      options: {
        expires: refreshExpiresAt,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
  ];
}

export function createLogoutCookiePayloads(
  secure: boolean,
): SessionCookiePayload[] {
  const expires = new Date(0);

  return [
    {
      name: SESSION_COOKIE_NAMES.authToken,
      value: "",
      options: {
        expires,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
    {
      name: SESSION_COOKIE_NAMES.refreshToken,
      value: "",
      options: {
        expires,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
    {
      name: SESSION_COOKIE_NAMES.sessionEmail,
      value: "",
      options: {
        expires,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
      },
    },
  ];
}
