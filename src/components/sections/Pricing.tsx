const packages = [
  {
    name: "Evaluation Engine",
    description: "Monthly or yearly subscription · Custom quote",
    points: ["Instant market value for any car", "Guidance on what to pay when buying", "Localized AI models and data", "Works on web and mobile"],
    featured: false,
  },
  {
    name: "MaskingTech",
    description: "Monthly or yearly subscription · Custom quote",
    points: ["Real-time plate and face masking", "Studio-grade background removal", "GDPR ready", "Bulk photo upload"],
    featured: false,
  },
  {
    name: "API Integration",
    description: "Monthly or yearly subscription · Custom quote",
    points: ["Connect to your existing systems", "Build custom workflows", "Flexible and secure APIs", "Real-time data sync and full support"],
    featured: false,
  },
  {
    name: "Complete Ecosystem",
    description: "Everything in one white-label subscription",
    points: ["Evaluation Engine and MaskingTech included", "CRM to manage leads and dealers", "Website and B2C sourcing portal", "Admin dashboard with live data", "Auction platform with iOS and Android apps", "API integration and full support"],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-7">
          <div className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-orange">PRICING &amp; PACKAGES</div>
          <h2 className="m-0 mb-2 text-[clamp(26px,3.2vw,30px)] font-bold leading-[1.1]">Buy one tool, or get the whole system</h2>
          <p className="m-0 max-w-[720px] text-[13px] leading-relaxed text-muted">Evaluation Engine, MaskingTech and API Integration can be bought separately. The CRM, website, dashboard and auctions come together in the Complete Ecosystem.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <article key={item.name} className={`flex flex-col rounded-lg border p-5 ${item.featured ? "border-orange bg-[var(--featured-from)] shadow-[0_0_30px_var(--map-glow)]" : "border-line bg-panel"}`}>
              <span className={`mb-3 w-fit rounded border px-2 py-1 text-[10px] font-bold ${item.featured ? "border-orange text-orange" : "border-green text-green"}`}>
                {item.featured ? "BEST VALUE · PACKAGE ONLY" : "SOLD SEPARATELY"}
              </span>
              <h3 className="m-0 text-lg font-semibold text-text">{item.name}</h3>
              <p className="mt-1 text-xs text-muted">{item.description}</p>
              <ul className="mt-4 mb-6 grid gap-2 p-0 text-xs text-muted">
                {item.points.map((point) => <li key={point} className="list-none before:mr-2 before:text-orange before:content-['✓']">{point}</li>)}
              </ul>
              <a href="#contact" className={`mt-auto inline-flex justify-center rounded px-4 py-2.5 text-xs font-semibold transition-colors ${item.featured ? "bg-orange text-text hover:bg-orange-hover" : "border border-line-strong text-text hover:border-orange"}`}>
                {item.featured ? "Buy the Complete Ecosystem" : "Buy now"}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-line bg-panel p-5">
            <h3 className="m-0 mb-3 text-sm font-semibold">How the subscription works</h3>
            <ol className="m-0 grid gap-2 pl-5 text-xs leading-relaxed text-muted">
              <li>Book a demo and tell us how you trade.</li>
              <li>Pick one tool, or the Complete Ecosystem.</li>
              <li>We set it up under your brand.</li>
              <li>Pay monthly or yearly and move from a single tool to the package later.</li>
            </ol>
          </article>
          <article className="rounded-lg border border-line bg-panel p-5">
            <h3 className="m-0 mb-3 text-sm font-semibold">Why get everything together</h3>
            <ul className="m-0 grid gap-2 pl-5 text-xs leading-relaxed text-muted">
              <li>One connected system from valuation to auctions and CRM.</li>
              <li>Every listing photo is masked before it goes live.</li>
              <li>One brand, one login, one dashboard.</li>
              <li>One bill and one support team.</li>
              <li>CRM, website, dashboard and auctions are package-only.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
