import { LoginForm } from "@/src/features/auth/login/login-form";
import { AuthFooterLinks } from "@/src/shared/ui/auth-footer-links";
import { AuthShell } from "@/src/shared/ui/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      footer={
        <AuthFooterLinks
          prompt="Еще не зарегистрированы?"
          href="/register"
          label="Регистрация"
        />
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
