"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ApiErrorResponse, SessionMeResponse } from "@/src/shared/lib/auth-api";
import { InlineAlert } from "@/src/shared/ui/inline-alert";
import { PrimaryButton } from "@/src/shared/ui/primary-button";

import styles from "./account-panel.module.css";

type AccountState =
  | { status: "loading" }
  | { status: "ready"; user: SessionMeResponse }
  | { status: "error"; message: string };

export function AccountPanel() {
  const router = useRouter();
  const [state, setState] = useState<AccountState>({ status: "loading" });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSession() {
      const response = await fetch("/api/session/me", {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        const payload = (await response.json()) as ApiErrorResponse;
        setState({ status: "error", message: payload.message });
        return;
      }

      const payload = (await response.json()) as SessionMeResponse;
      setState({ status: "ready", user: payload });
    }

    loadSession().catch((error: unknown) => {
      if ((error as { name?: string }).name === "AbortError") {
        return;
      }

      setState({
        status: "error",
        message: "Не удалось загрузить данные сессии",
      });
    });

    return () => controller.abort();
  }, [router]);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/login");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Сессия активна</h1>
        {state.status === "loading" ? (
          <p className={styles.muted}>Проверяем данные пользователя...</p>
        ) : null}
        {state.status === "error" ? <InlineAlert>{state.message}</InlineAlert> : null}
        {state.status === "ready" ? (
          <div className={styles.userBlock}>
            <p className={styles.userLabel}>E-mail</p>
            <p className={styles.userValue}>{state.user.email}</p>
            <p className={styles.userMeta}>
              Статус: {state.user.active ? "active" : "inactive"}
            </p>
          </div>
        ) : null}
        <PrimaryButton type="button" onClick={handleLogout} pending={isLoggingOut}>
          Выйти
        </PrimaryButton>
      </section>
    </main>
  );
}
