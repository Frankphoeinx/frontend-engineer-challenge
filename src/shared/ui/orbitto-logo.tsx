import Image from "next/image";

export function OrbittoLogo() {
  return (
    <Image
      src="/assets/orbitto-logo.svg"
      alt="Orbitto"
      width={221}
      height={40}
      priority
    />
  );
}
