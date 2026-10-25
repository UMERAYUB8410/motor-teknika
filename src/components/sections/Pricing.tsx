import LocaleLink from "@/components/ui/LocaleLink";
import type { LocaleCode } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

export default function Pricing({ lang }: { lang: LocaleCode }) {
  const t = getDictionary(lang).pricing;

  return (
    <section id="pricing" className="border-b border-line py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-7">
          <div className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-orange">{t.eyebrow}</div>
          <h2 className="m-0 mb-2 text-[clamp(26px,3.2vw,30px)] font-bold leading-[1.1]">{t.title}</h2>
          <p className="m-0 max-w-[720px] text-[13px] leading-relaxed text-muted">{t.intro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.packages.map((item) => (
            <article key={item.name} className={`flex flex-col rounded-lg border p-5 ${item.featured ? "border-orange bg-[var(--featured-from)] shadow-[0_0_30px_var(--map-glow)]" : "border-line bg-panel"}`}>
              <span className={`mb-3 w-fit rounded border px-2 py-1 text-[10px] font-bold ${item.featured ? "border-orange text-orange" : "border-green text-green"}`}>
                {item.featured ? t.bestValue : t.soldSeparately}
              </span>
              <h3 className="m-0 text-lg font-semibold text-text">{item.name}</h3>
              <p className="mt-1 text-xs text-muted">{item.description}</p>
              <ul className="mt-4 mb-6 grid gap-2 p-0 text-xs text-muted">
                {item.points.map((point) => <li key={point} className="list-none before:me-2 before:text-orange before:content-['✓']">{point}</li>)}
              </ul>
              <LocaleLink href="/contact" className={`mt-auto inline-flex justify-center rounded px-4 py-2.5 text-xs font-semibold transition-colors ${item.featured ? "bg-orange text-text hover:bg-orange-hover" : "border border-line-strong text-text hover:border-orange"}`}>
                {item.featured ? t.buyEcosystem : t.buyNow}
              </LocaleLink>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-line bg-panel p-5">
            <h3 className="m-0 mb-3 text-sm font-semibold">{t.howTitle}</h3>
            <ol className="m-0 grid gap-2 ps-5 text-xs leading-relaxed text-muted">
              {t.howSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </article>
          <article className="rounded-lg border border-line bg-panel p-5">
            <h3 className="m-0 mb-3 text-sm font-semibold">{t.whyTitle}</h3>
            <ul className="m-0 grid gap-2 ps-5 text-xs leading-relaxed text-muted">
              {t.whyPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
