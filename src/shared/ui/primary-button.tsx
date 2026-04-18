"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/src/shared/lib/cx";

import styles from "./primary-button.module.css";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean;
  children: ReactNode;
}

export function PrimaryButton({
  className,
  pending = false,
  disabled,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={cx(styles.root, className)}
      disabled={disabled || pending}
    >
      {pending ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}
