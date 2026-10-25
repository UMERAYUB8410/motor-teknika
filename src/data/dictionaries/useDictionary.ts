"use client";

import { usePathname } from "next/navigation";
import { localeFromPath } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

/** Site copy for the language of the current URL (client components) */
export function useDictionary() {
  return getDictionary(localeFromPath(usePathname()));
}
