"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, localizePath } from "@/data/locales";

/** next/link that keeps the visitor in their current language: "/contact" → "/ar/contact" on Arabic pages */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const locale = localeFromPath(usePathname());
  return <Link href={localizePath(href, locale)} {...props} />;
}
