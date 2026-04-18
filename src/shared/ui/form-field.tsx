"use client";

import type { ReactNode } from "react";

import { cx } from "@/src/shared/lib/cx";

import styles from "./form-field.module.css";

interface FormFieldProps {
  label: string;
  placeholder: string;
  inputId: string;
  value?: string;
  invalid?: boolean;
  error?: string;
  trailing?: ReactNode;
  children: ReactNode;
}

export function FormField({
  label,
  placeholder,
  inputId,
  value,
  invalid = false,
  error,
  trailing,
  children,
}: FormFieldProps) {
  const hasValue = Boolean(value);
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <div
        className={cx(styles.root, hasValue && styles.raised, invalid && styles.invalid)}
      >
        <div className={styles.inner}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          <span className={styles.controlRow}>
            {children}
            {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
          </span>
        </div>
      </div>
      {error ? (
        <p id={describedBy} role="alert" aria-live="polite" className={styles.errorText}>
          {error}
        </p>
      ) : null}
      <span className={styles.placeholderOnly} aria-hidden="true">
        {placeholder}
      </span>
    </div>
  );
}
