"use client";

import { usePathname } from "next/navigation";
import MobileNav from "@/components/layout/MobileNav";
import { LanguageMenu } from "@/components/layout/LanguageSwitcher";
import LocaleLink from "@/components/ui/LocaleLink";
import { navLinks } from "@/data/navigation";
import { stripLocale } from "@/data/locales";
import { useDictionary } from "@/data/dictionaries/useDictionary";

export default function Header() {
  const pathname = stripLocale(usePathname());
  const t = useDictionary().nav;

  return (
    <header className="sticky top-0 z-30 h-[58px] border-b border-line bg-[rgba(7,9,13,0.94)] backdrop-blur-[10px]">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center h-full gap-6">
        {/* Logo – the lockup always reads left-to-right, even on Arabic pages */}
        <div className="me-auto shrink-0">
          <LocaleLink href="/" dir="ltr" aria-label={t.homeLabel} className="flex items-center gap-[10px] font-semibold text-[21px]">
            {/* orange clip-path mark */}
            <span
              aria-hidden="true"
              className="w-6 h-7 bg-orange shrink-0"
              style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }}
            />
            Motor <span className="text-orange">Teknika</span>
          </LocaleLink>
        </div>

        {/* Desktop nav */}
        <nav aria-label={t.main} className="hidden min-[1000px]:flex">
          <ul className="flex gap-[34px] list-none text-[13px] text-[#c5cad3]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    className={[
                      "transition-colors py-1",
                      isActive
                        ? "text-orange border-b-2 border-orange pb-[6px]"
                        : "hover:text-text",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t[link.key]}
                  </LocaleLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language */}
        <div className="hidden min-[1000px]:block mx-1 shrink-0">
          <LanguageMenu />
        </div>

        {/* CTA */}
        <LocaleLink
          href="/contact"
          className="hidden min-[1000px]:inline-flex items-center gap-2 px-5 py-[9px] rounded bg-orange text-white text-[13px] font-semibold hover:bg-orange-hover transition-colors shrink-0"
        >
          {t.bookDemo}
        </LocaleLink>

        {/* Mobile hamburger */}
        <div className="min-[1000px]:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
