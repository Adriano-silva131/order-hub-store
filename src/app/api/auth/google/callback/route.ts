import { NextRequest, NextResponse } from "next/server";
import { authServiceFetch, setSessionCookies } from "@/shared/lib/backend-client";
import { isSafeRedirectPath } from "@/shared/lib/safe-redirect";

type GoogleOAuthCallbackResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  redirect_to: string;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error || !code || !state) {
    return NextResponse.redirect(new URL("/login?error=google", request.url));
  }

  const res = await authServiceFetch("/auth/oauth/google/callback", {
    method: "POST",
    body: JSON.stringify({ code, state }),
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login?error=google", request.url));
  }

  const data: GoogleOAuthCallbackResponse = await res.json();
  await setSessionCookies(data);

  const redirectTo = isSafeRedirectPath(data.redirect_to) ? data.redirect_to : "/";
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
