import Image from "next/image";

import styles from "./auth-illustration.module.css";

export function AuthIllustration() {
  return (
    <figure className={styles.root} aria-hidden="true">
      <div className={styles.scene}>
        <div className={styles.particleLeft} />
        <div className={styles.particleTopRight} />
        <Image
          src="/assets/auth-illustration-globe.svg"
          alt=""
          width={480}
          height={480}
          className={styles.globe}
        />
        <div className={styles.particleBottomRight} />
      </div>
    </figure>
  );
}
