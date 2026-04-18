import { Code, ConnectError } from "@connectrpc/connect";

import type { ApiErrorResponse } from "@/src/shared/lib/auth-api";

interface MappedApiError {
  status: number;
  body: ApiErrorResponse;
}

export function mapLoginError(error: unknown): MappedApiError {
  const connectError = ConnectError.from(error);

  switch (connectError.code) {
    case Code.InvalidArgument:
      return {
        status: 400,
        body: {
          code: "validation_error",
          message: connectError.rawMessage || "Проверьте введённые данные",
        },
      };
    case Code.Unauthenticated:
      return {
        status: 401,
        body: {
          code: "invalid_credentials",
          message: "Введены неверные данные",
        },
      };
    case Code.ResourceExhausted:
      return {
        status: 429,
        body: {
          code: "rate_limited",
          message: "Слишком много попыток входа. Попробуйте позже",
        },
      };
    default:
      return {
        status: 503,
        body: {
          code: "unavailable",
          message: "Сервис временно недоступен. Попробуйте позже",
        },
      };
  }
}

export function mapSessionError(error: unknown): MappedApiError {
  const connectError = ConnectError.from(error);

  switch (connectError.code) {
    case Code.NotFound:
    case Code.Unauthenticated:
      return {
        status: 401,
        body: {
          code: "unauthorized",
          message: "Сессия недействительна",
        },
      };
    default:
      return {
        status: 503,
        body: {
          code: "unavailable",
          message: "Сервис временно недоступен. Попробуйте позже",
        },
      };
  }
}
