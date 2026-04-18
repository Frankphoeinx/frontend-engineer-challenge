export function getAuthGrpcEndpoint(): string {
  return process.env.AUTH_GRPC_ENDPOINT ?? "http://127.0.0.1:8080";
}

export function isSecureCookieContext(): boolean {
  return process.env.NODE_ENV === "production";
}
