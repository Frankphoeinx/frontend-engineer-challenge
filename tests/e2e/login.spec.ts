import { expect, test } from "@playwright/test";

const baseUrl = "http://127.0.0.1:3000";

test("successful login redirects to account", async ({ context, page }) => {
  await page.route("**/api/auth/login", async (route) => {
    await context.addCookies([
      {
        name: "orbitto_auth_token",
        value: "auth-token",
        url: baseUrl,
        httpOnly: true,
        sameSite: "Lax",
      },
      {
        name: "orbitto_refresh_token",
        value: "refresh-token",
        url: baseUrl,
        httpOnly: true,
        sameSite: "Lax",
      },
      {
        name: "orbitto_session_email",
        value: "name@mail.com",
        url: baseUrl,
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        redirectTo: "/account",
      }),
    });
  });

  await page.route("**/api/session/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        email: "name@mail.com",
        active: true,
      }),
    });
  });

  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill("name@mail.com");
  await page.getByLabel("Пароль", { exact: true }).fill("secret");
  await page.getByRole("button", { name: "Войти" }).click();

  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByText("name@mail.com")).toBeVisible();
});

test("invalid credentials show an inline error", async ({ page }) => {
  await page.route("**/api/auth/login", async (route) => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({
        code: "invalid_credentials",
        message: "Введены неверные данные",
      }),
    });
  });

  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill("name@mail.com");
  await page.getByLabel("Пароль", { exact: true }).fill("wrong-password");
  await page.getByRole("button", { name: "Войти" }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByText("Введены неверные данные")).toBeVisible();
});

test("protected account redirects to login without session", async ({ page }) => {
  await page.goto("/account");

  await expect(page).toHaveURL(/\/login$/);
});

test("auth links are reachable", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("link", { name: "Регистрация" }).click();
  await expect(page).toHaveURL(/\/register$/);

  await page.goto("/login");
  await page.getByRole("link", { name: "Забыли пароль?" }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
});
