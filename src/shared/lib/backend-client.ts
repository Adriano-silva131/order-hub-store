import "server-only";
import { cookies } from "next/headers";
import { env } from "@/shared/config/env";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "@/shared/lib/session-cookie-names";

type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function backendFetch(baseUrl: string, path: string, init?: RequestInit) {
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
}

export function authServiceFetch(path: string, init?: RequestInit) {
  return backendFetch(env.AUTH_SERVICE_URL, path, init);
}

export function apiGatewayFetch(path: string, init?: RequestInit) {
  return backendFetch(env.API_GATEWAY_URL, path, init);
}

export async function setSessionCookies(tokens: TokenPair) {
  const store = await cookies();
  store.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
    ...cookieOptions,
    maxAge: tokens.expires_in,
  });
  store.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookies() {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_COOKIE);
  store.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH_TOKEN_COOKIE)?.value;
}

export async function hasSession() {
  return Boolean(await getRefreshToken());
}

export async function refreshSession(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const res = await authServiceFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    await clearSessionCookies();
    return null;
  }

  const tokens: TokenPair = await res.json();
  await setSessionCookies(tokens);
  return tokens.access_token;
}

export async function authorizedApiGatewayFetch(
  path: string,
  init?: RequestInit,
) {
  const accessToken = await getAccessToken();

  const call = (token?: string) =>
    apiGatewayFetch(path, {
      ...init,
      headers: token
        ? { ...init?.headers, Authorization: `Bearer ${token}` }
        : init?.headers,
    });

  let res = await call(accessToken);

  if (res.status === 401) {
    const refreshed = await refreshSession();
    if (refreshed) {
      res = await call(refreshed);
    }
  }

  return res;
}
