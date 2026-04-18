import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введите e-mail")
    .email("Введите корректный e-mail")
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1, "Введите пароль"),
});

export type LoginFormValues = z.output<typeof loginFormSchema>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
