"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { LanguageLinks } from "@/components/layout/LanguageSwitcher";
import LocaleLink from "@/components/ui/LocaleLink";
import { navLinks } from "@/data/navigation";
import { stripLocale } from "@/data/locales";
import { useDictionary } from "@/data/dictionaries/useDictionary";


export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const pathname = stripLocale(usePathname());
  const t = useDictionary().nav;

  const close = useCallback(() => setOpen(false), []);

  /* Escape to close */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  /* Lock scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 rounded text-muted hover:text-text transition-colors"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Slide-down panel */}
      <div
        id="mobile-nav"
        ref={menuRef}
        role="dialog"
        aria-label={t.menu}
        aria-modal="true"
        className={[
          "fixed inset-x-0 top-[58px] z-40 bg-panel border-b border-line px-6 py-4",
          "transition-all duration-300 ease-in-out",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label={t.mobile}>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={[
                    "block py-3 text-[15px] transition-colors",
                    pathname === link.href ? "text-orange" : "text-muted hover:text-text",
                  ].join(" ")}
                >
                  {t[link.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
            <LanguageLinks onNavigate={close} />
            <LocaleLink
              href="/contact"
              onClick={close}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-orange text-white text-[13px] font-semibold hover:bg-orange-hover transition-colors"
            >
              {t.bookDemo}
            </LocaleLink>
          </div>
        </nav>
      </div>
    </>
  );
}
