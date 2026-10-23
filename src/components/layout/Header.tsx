"use client";

import { useState, useEffect, useRef } from "react";
import MobileNav from "@/components/layout/MobileNav";

const navLinks = [
  { label: "Home",         href: "#home"     },
  { label: "Services",     href: "#services" },
  { label: "How It Works", href: "#how"      },
  { label: "About",        href: "#about"    },
  { label: "Contact",      href: "#contact"  },
];

const SECTIONS = ["home", "services", "how", "about", "contact"];

export default function Header() {
  const [active, setActive] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const map = new Map<Element, string>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(map.get(e.target) ?? "home");
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        map.set(el, id);
        observerRef.current!.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 h-[58px] border-b border-line bg-[rgba(7,9,13,0.94)] backdrop-blur-[10px]">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center h-full gap-6">
        {/* Logo */}
        <a href="#home" aria-label="Motor Teknika home" className="flex items-center gap-[10px] font-semibold text-[21px] mr-auto shrink-0">
          {/* orange clip-path mark */}
          <span
            aria-hidden="true"
            className="w-6 h-7 bg-orange shrink-0"
            style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }}
          />
          Motor <span className="text-orange">Teknika</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden min-[1000px]:flex">
          <ul className="flex gap-[34px] list-none text-[13px] text-[#c5cad3]">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={[
                      "transition-colors py-1",
                      isActive
                        ? "text-orange border-b-2 border-orange pb-[6px]"
                        : "hover:text-text",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language */}
        <span className="hidden min-[1000px]:inline text-[13px] text-[#c5cad3] mx-2 shrink-0">
          EN ⌄
        </span>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden min-[1000px]:inline-flex items-center gap-2 px-5 py-[9px] rounded bg-orange text-white text-[13px] font-semibold hover:bg-orange-hover transition-colors shrink-0"
        >
          Book a Demo →
        </a>

        {/* Mobile hamburger */}
        <div className="min-[1000px]:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
