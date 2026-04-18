import Link from "next/link";

import styles from "./auth-footer-links.module.css";

interface AuthFooterLinksProps {
  prompt: string;
  href: string;
  label: string;
}

export function AuthFooterLinks({
  prompt,
  href,
  label,
}: AuthFooterLinksProps) {
  return (
    <div className={styles.root}>
      <span className={styles.prompt}>{prompt}</span>
      <Link href={href} className={styles.link}>
        {label}
      </Link>
    </div>
  );
}
