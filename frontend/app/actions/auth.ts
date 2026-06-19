"use server";

import { redirect } from "next/navigation";
import { loginApi, registerApi } from "@/lib/api-server";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth-server";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let data;
  try {
    data = await loginApi(email, password);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Invalid email or password";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  await setAuthCookies(data.token, data.user);
  redirect("/dashboard?success=Logged in successfully");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await registerApi(name, email, password);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Registration failed";
    redirect(`/register?error=${encodeURIComponent(message)}`);
  }

  let data;
  try {
    data = await loginApi(email, password);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Login failed after registration";
    redirect(`/register?error=${encodeURIComponent(message)}`);
  }

  await setAuthCookies(data.token, data.user);
  redirect("/dashboard?success=Account created successfully");
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login?success=Logged out successfully");
}
