import { cookies } from "next/headers";
import { TOKEN_KEY, USER_KEY } from "@/lib/constants";
import type { User } from "@/types/user";

const MAX_AGE = 7 * 24 * 60 * 60;

export async function getServerToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value ?? null;
}

export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(USER_KEY)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function setAuthCookies(token: string, user: User) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    path: "/",
    maxAge: MAX_AGE,
    sameSite: "lax",
  });
  cookieStore.set(USER_KEY, JSON.stringify(user), {
    path: "/",
    maxAge: MAX_AGE,
    sameSite: "lax",
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  cookieStore.delete(USER_KEY);
}
