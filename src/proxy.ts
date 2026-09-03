import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REFRESH_TOKEN_COOKIE } from "@/shared/lib/session-cookie-names";

const PROTECTED_PREFIXES = ["/pedidos", "/checkout/entrega", "/checkout/pagamento"];

export function proxy(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!request.cookies.has(REFRESH_TOKEN_COOKIE)) {
    const isCheckoutStep = request.nextUrl.pathname.startsWith("/checkout");
    const loginUrl = new URL(isCheckoutStep ? "/checkout" : "/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pedidos/:path*", "/checkout/entrega/:path*", "/checkout/pagamento/:path*"],
};
