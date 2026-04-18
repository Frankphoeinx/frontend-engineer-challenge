"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";

import { FormField } from "@/src/shared/ui/form-field";
import styles from "@/src/shared/ui/form-field.module.css";

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  invalid?: boolean;
  placeholder: string;
}

export function PasswordField({
  label,
  error,
  invalid = false,
  placeholder,
  value,
  ...props
}: PasswordFieldProps) {
  const inputId = useId();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormField
      label={label}
      placeholder={placeholder}
      inputId={inputId}
      value={String(value ?? "")}
      invalid={invalid}
      error={error}
      trailing={
        <button
          type="button"
          className={styles.trailingButton}
          aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
          onClick={() => setIsVisible((value) => !value)}
        >
          <svg
            className={styles.eye}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 12C3.7 7.75 7.4 5.625 12 5.625C16.6 5.625 20.3 7.75 22.5 12C20.3 16.25 16.6 18.375 12 18.375C7.4 18.375 3.7 16.25 1.5 12Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      }
    >
      <input
        {...props}
        id={inputId}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={styles.input}
      />
    </FormField>
  );
}
