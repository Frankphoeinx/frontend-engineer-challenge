import Link from "next/link";

import styles from "./auth-stub.module.css";

interface AuthStubProps {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}

export function AuthStub({
  title,
  description,
  backHref,
  backLabel,
}: AuthStubProps) {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link href={backHref} className={styles.link}>
        {backLabel}
      </Link>
    </section>
  );
}
