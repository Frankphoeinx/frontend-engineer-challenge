export function createForwardedHeaders(sourceHeaders: Headers): Headers {
  const headers = new Headers();
  const forwardedFor = sourceHeaders.get("x-forwarded-for");
  const realIp = sourceHeaders.get("x-real-ip");

  if (forwardedFor) {
    headers.set("x-forwarded-for", forwardedFor);
  }

  if (realIp) {
    headers.set("x-real-ip", realIp);
  }

  return headers;
}

export function createAuthorizedHeaders(
  sourceHeaders: Headers,
  authToken: string,
): Headers {
  const headers = createForwardedHeaders(sourceHeaders);
  headers.set("authorization", `Bearer ${authToken}`);

  return headers;
}
