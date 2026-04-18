import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AccountPanel } from "@/src/features/auth/account/account-panel";
import { SESSION_COOKIE_NAMES } from "@/src/server/auth/cookie-names";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const hasSession =
    cookieStore.has(SESSION_COOKIE_NAMES.authToken) &&
    cookieStore.has(SESSION_COOKIE_NAMES.refreshToken) &&
    cookieStore.has(SESSION_COOKIE_NAMES.sessionEmail);

  if (!hasSession) {
    redirect("/login");
  }

  return <AccountPanel />;
}
