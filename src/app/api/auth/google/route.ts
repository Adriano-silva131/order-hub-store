import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";
import { isSafeRedirectPath } from "@/shared/lib/safe-redirect";

export function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("redirect_to") ?? undefined;
  const redirectTo = isSafeRedirectPath(requested) ? requested : "/";

  const target = new URL("/auth/oauth/google/start", env.AUTH_SERVICE_URL);
  target.searchParams.set("redirect_to", redirectTo);

  return NextResponse.redirect(target);
}
