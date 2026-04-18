import { AuthStub } from "@/src/features/auth/stub/auth-stub";
import { AuthShell } from "@/src/shared/ui/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <AuthStub
        title="Восстановление пароля"
        description="Этот сценарий будет реализован следующим шагом. Сейчас доступен только login slice."
        backHref="/login"
        backLabel="Вернуться ко входу"
      />
    </AuthShell>
  );
}
