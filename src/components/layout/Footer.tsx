import LocaleLink from "@/components/ui/LocaleLink";
import type { LocaleCode } from "@/data/locales";
import { getDictionary, type Dictionary } from "@/data/dictionaries";

type LinkKey = keyof Dictionary["footer"]["links"];

const footerGroups: { key: keyof Dictionary["footer"]["groups"]; links: [LinkKey, string][] }[] = [
  {
    key: "company",
    links: [["about", "/about"], ["howItWorks", "/how-it-works"], ["careers", "/contact"], ["contact", "/contact"]],
  },
  {
    key: "contact",
    links: [["sales", "/contact"], ["support", "/contact"], ["bookDemo", "/contact"]],
  },
  {
    key: "subjects",
    links: [["valuation", "/services"], ["masking", "/services"], ["auctions", "/services"], ["api", "/#integrations"]],
  },
  {
    key: "partners",
    links: [["salesPartner", "/contact"], ["servicePartner", "/contact"], ["affiliate", "/contact"]],
  },
];

export default function Footer({ lang }: { lang: LocaleCode }) {
  const t = getDictionary(lang);

  return (
    <footer className="border-t border-line bg-panel py-14 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(4,1fr)] lg:gap-8">
          <LocaleLink href="/" dir="ltr" aria-label={t.nav.homeLabel} className="flex h-fit w-fit items-center gap-2.5 text-xl font-semibold">
            <span aria-hidden="true" className="h-7 w-6 shrink-0 bg-orange" style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }} />
            Motor <span className="text-orange">Teknika</span>
          </LocaleLink>

          {footerGroups.map((group) => (
            <div key={group.key}>
              <h2 className="m-0 mb-5 text-sm font-medium text-text">{t.footer.groups[group.key]}</h2>
              <ul className="m-0 grid list-none gap-3 p-0 text-sm text-muted">
                {group.links.map(([key, href]) => (
                  <li key={key}>
                    <LocaleLink href={href} className="transition-colors hover:text-text">
                      {t.footer.links[key]}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
