import type { ReactNode } from "react";

import { AuthIllustration } from "@/src/shared/ui/auth-illustration";
import { OrbittoLogo } from "@/src/shared/ui/orbitto-logo";

import styles from "./auth-shell.module.css";

interface AuthShellProps {
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ children, footer }: AuthShellProps) {
  return (
    <div className={styles.root}>
      <section className={styles.panel}>
        <header className={styles.header}>
          <OrbittoLogo />
        </header>
        <main className={styles.content}>{children}</main>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </section>
      <AuthIllustration />
    </div>
  );
}
