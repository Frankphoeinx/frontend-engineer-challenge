"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";

import { FormField } from "@/src/shared/ui/form-field";
import styles from "@/src/shared/ui/form-field.module.css";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  invalid?: boolean;
  placeholder: string;
}

export function TextField({
  label,
  error,
  invalid = false,
  placeholder,
  value,
  ...props
}: TextFieldProps) {
  const inputId = useId();

  return (
    <FormField
      label={label}
      placeholder={placeholder}
      inputId={inputId}
      value={String(value ?? "")}
      invalid={invalid}
      error={error}
    >
      <input
        {...props}
        id={inputId}
        type="email"
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={styles.input}
      />
    </FormField>
  );
}
