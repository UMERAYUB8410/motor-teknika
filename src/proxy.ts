import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, localeFromPath, stripLocale } from "@/data/locales";

/**
 * English is served without a prefix: /services is rewritten to /en/services internally.
 * /en/... is redirected to the unprefixed URL so each page has one address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url, 308);
  }

  if (localeFromPath(pathname) !== defaultLocale) return;

  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and files with an extension (images, favicon, etc.)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
