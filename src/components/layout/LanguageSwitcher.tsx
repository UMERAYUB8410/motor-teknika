"use client";

import { useState, useEffect, useRef, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { locales, getLocale, localeFromPath, localizePath, stripLocale } from "@/data/locales";
import { format } from "@/data/dictionaries";
import { useDictionary } from "@/data/dictionaries/useDictionary";

/** Same page in each language: "/ar/about" → { en: "/about", ar: "/ar/about" } */
function useLocaleLinks() {
  const pathname = usePathname();
  const current = localeFromPath(pathname);
  const basePath = stripLocale(pathname);
  return {
    current,
    links: locales.map((l) => ({ ...l, href: localizePath(basePath, l.code) })),
  };
}

/* Desktop: "EN ⌄" button with a small dropdown */
export function LanguageMenu() {
  const { current, links } = useLocaleLinks();
  const t = useDictionary().nav;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  /* Close on outside click and Escape */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={format(t.changeLanguage, { language: getLocale(current).label })}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2 py-1 rounded text-[13px] text-[#c5cad3] hover:text-text transition-colors"
      >
        {getLocale(current).short}
        <ChevronDown size={14} aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        className="absolute end-0 top-[calc(100%+8px)] z-40 min-w-[150px] list-none m-0 p-1 rounded border border-line bg-panel shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
      >
        {links.map((l) => {
          const isActive = l.code === current;
          return (
            <li key={l.code}>
              <Link
                href={l.href}
                hrefLang={l.code}
                lang={l.code}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center justify-between gap-3 px-3 py-2 rounded text-[13px] transition-colors",
                  isActive ? "text-orange" : "text-muted hover:text-text hover:bg-panel2",
                ].join(" ")}
              >
                {l.label}
                {isActive && <Check size={14} aria-hidden="true" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Mobile menu: languages as a row of links */
export function LanguageLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { current, links } = useLocaleLinks();
  const t = useDictionary().nav;

  return (
    <ul aria-label={t.language} className="flex items-center gap-1 list-none m-0 p-0">
      {links.map((l) => {
        const isActive = l.code === current;
        return (
          <li key={l.code}>
            <Link
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              aria-current={isActive ? "true" : undefined}
              onClick={onNavigate}
              className={[
                "block px-3 py-2 rounded text-sm transition-colors",
                isActive ? "text-orange bg-panel2" : "text-muted hover:text-text",
              ].join(" ")}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
