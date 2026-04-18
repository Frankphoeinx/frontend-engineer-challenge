import { createClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";

import { getAuthGrpcEndpoint } from "@/src/server/auth/env";
import {
  AuthCommandService,
  AuthQueryService,
} from "@/src/server/grpc/gen/backend/auth/v1/auth_pb";

const transport = createGrpcTransport({
  baseUrl: getAuthGrpcEndpoint(),
  useBinaryFormat: true,
});

export function createAuthCommandClient() {
  return createClient(AuthCommandService, transport);
}

export function createAuthQueryClient() {
  return createClient(AuthQueryService, transport);
}
