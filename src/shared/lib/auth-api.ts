export type LoginApiErrorCode =
  | "validation_error"
  | "invalid_credentials"
  | "rate_limited"
  | "unavailable"
  | "unauthorized";

export interface ApiErrorResponse {
  code: LoginApiErrorCode;
  message: string;
}

export interface LoginApiSuccessResponse {
  ok: true;
  redirectTo: string;
}

export interface SessionMeResponse {
  email: string;
  active: boolean;
}
