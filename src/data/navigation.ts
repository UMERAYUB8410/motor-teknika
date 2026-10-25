import type { Dictionary } from "@/data/dictionaries";

export type NavLink = {
  /** Label key in the dictionary's nav section */
  key: keyof Dictionary["nav"];
  href: string;
};

export const navLinks: NavLink[] = [
  { key: "home",       href: "/"             },
  { key: "services",   href: "/services"     },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "about",      href: "/about"        },
  { key: "contact",    href: "/contact"      },
];
