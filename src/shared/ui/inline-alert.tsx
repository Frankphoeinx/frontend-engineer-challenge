import type { ReactNode } from "react";

import styles from "./inline-alert.module.css";

export function InlineAlert({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root} role="alert" aria-live="polite">
      {children}
    </div>
  );
}
