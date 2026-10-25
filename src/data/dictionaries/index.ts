import { en, type Dictionary } from "@/data/dictionaries/en";
import { ar } from "@/data/dictionaries/ar";
import type { LocaleCode } from "@/data/locales";

export type { Dictionary };

const dictionaries: Record<LocaleCode, Dictionary> = { en, ar };

export function getDictionary(code: LocaleCode): Dictionary {
  return dictionaries[code];
}

/** Fill {placeholders}: format("Hi {name}", { name: "Sam" }) → "Hi Sam" */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
