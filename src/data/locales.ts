export type Locale = {
  code: "en" | "ar";
  /** Name shown in the switcher, written in its own language */
  label: string;
  short: string;
  dir: "ltr" | "rtl";
};

export const locales: Locale[] = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
];

export type LocaleCode = Locale["code"];

/** English lives at the root (/services); other languages get a prefix (/ar/services) */
export const defaultLocale: LocaleCode = "en";

export function hasLocale(code: string): code is LocaleCode {
  return locales.some((l) => l.code === code);
}

export function getLocale(code: LocaleCode): Locale {
  return locales.find((l) => l.code === code)!;
}

/** The locale a URL path belongs to: "/ar/about" → "ar", "/about" → "en" */
export function localeFromPath(pathname: string): LocaleCode {
  const first = pathname.split("/")[1] ?? "";
  return hasLocale(first) ? first : defaultLocale;
}

/** Drop the locale prefix: "/ar/about" → "/about", "/ar" → "/" */
export function stripLocale(pathname: string): string {
  const first = pathname.split("/")[1] ?? "";
  if (!hasLocale(first)) return pathname;
  return pathname.slice(first.length + 1) || "/";
}

/** Build a path for a locale: ("/about", "ar") → "/ar/about", ("/#integrations", "ar") → "/ar#integrations" */
export function localizePath(path: string, code: LocaleCode): string {
  if (code === defaultLocale || !path.startsWith("/")) return path;
  return path === "/" || path.startsWith("/#") ? `/${code}${path.slice(1)}` : `/${code}${path}`;
}
