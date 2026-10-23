"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Menu } from "lucide-react";

const navLinks = [
  { label: "Home",        href: "#home"     },
  { label: "Services",    href: "#services" },
  { label: "How It Works",href: "#how"      },
  { label: "About",       href: "#about"    },
  { label: "Contact",     href: "#contact"  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
        aria-label={open ? "Close menu" : "Open menu"}
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
        aria-label="Navigation menu"
        aria-modal="true"
        className={[
          "fixed inset-x-0 top-[58px] z-40 bg-panel border-b border-line px-6 py-4",
          "transition-all duration-300 ease-in-out",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block py-3 text-[15px] text-muted hover:text-text transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
            <span className="text-sm text-muted">EN ⌄</span>
            <a
              href="#contact"
              onClick={close}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-orange text-white text-[13px] font-semibold hover:bg-orange-hover transition-colors"
            >
              Book a Demo →
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
