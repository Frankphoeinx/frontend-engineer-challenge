import { AuthStub } from "@/src/features/auth/stub/auth-stub";
import { AuthShell } from "@/src/shared/ui/auth-shell";

export default function RegisterPage() {
  return (
    <AuthShell>
      <AuthStub
        title="Регистрация"
        description="Этот сценарий будет реализован следующим шагом. Сейчас доступен только login slice."
        backHref="/login"
        backLabel="Вернуться ко входу"
      />
    </AuthShell>
  );
}
