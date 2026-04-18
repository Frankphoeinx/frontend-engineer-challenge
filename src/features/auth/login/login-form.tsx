"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  ApiErrorResponse,
  LoginApiSuccessResponse,
} from "@/src/shared/lib/auth-api";
import { PasswordField } from "@/src/shared/ui/password-field";
import { PrimaryButton } from "@/src/shared/ui/primary-button";
import { TextField } from "@/src/shared/ui/text-field";
import { InlineAlert } from "@/src/shared/ui/inline-alert";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/src/features/auth/login/login-form.schema";

import styles from "./login-form.module.css";

type LoginAlertState = {
  kind:
    | "invalid_credentials"
    | "rate_limited"
    | "unavailable"
    | "validation_error"
    | "unauthorized";
  message: string;
} | null;

export function LoginForm() {
  const router = useRouter();
  const [alert, setAlert] = useState<LoginAlertState>(null);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = useWatch({ control, name: "email" }) ?? "";
  const passwordValue = useWatch({ control, name: "password" }) ?? "";

  const onSubmit = handleSubmit(async (values) => {
    setAlert(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const error = (await response.json()) as ApiErrorResponse;

      if (error.code === "invalid_credentials") {
        setError("password", { message: error.message });
        return;
      }

      if (error.code === "validation_error") {
        setError("email", { message: error.message });
        return;
      }

      setAlert({
        kind: error.code,
        message: error.message,
      });
      return;
    }

    const payload = (await response.json()) as LoginApiSuccessResponse;
    router.push(payload.redirectTo);
  });

  const invalidCredentials = !errors.email && Boolean(errors.password?.message);

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Войти в систему</h1>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <TextField
            label="E-mail"
            placeholder="Введите e-mail"
            autoComplete="email"
            {...register("email")}
            value={emailValue}
            error={errors.email?.message}
            invalid={Boolean(errors.email) || invalidCredentials}
          />
          <PasswordField
            label="Пароль"
            placeholder="Введите пароль"
            autoComplete="current-password"
            {...register("password")}
            value={passwordValue}
            error={errors.password?.message}
            invalid={Boolean(errors.password) || invalidCredentials}
          />
          {alert ? <InlineAlert>{alert.message}</InlineAlert> : null}
          <PrimaryButton type="submit" pending={isSubmitting}>
            Войти
          </PrimaryButton>
          <Link href="/forgot-password" className={styles.forgotLink}>
            Забыли пароль?
          </Link>
        </form>
      </div>
    </section>
  );
}
