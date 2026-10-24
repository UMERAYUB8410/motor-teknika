const footerGroups = [
  {
    title: "Company",
    links: ["About us", "How it works", "Careers", "Contact"],
  },
  {
    title: "Contact",
    links: ["Sales", "Support", "Book a Demo"],
  },
  {
    title: "Subjects",
    links: ["Vehicle valuation", "Photo masking", "Dealer auctions", "API integration"],
  },
  {
    title: "Partner Programs",
    links: ["Sales partner program", "Service partner program", "Affiliate program"],
  },
];

const linkTargets: Record<string, string> = {
  "About us": "#about",
  "How it works": "#how",
  Careers: "#contact",
  Contact: "#contact",
  Sales: "#contact",
  Support: "#contact",
  "Book a Demo": "#contact",
  "Vehicle valuation": "#services",
  "Photo masking": "#services",
  "Dealer auctions": "#services",
  "API integration": "#integrations",
};

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel py-14 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(4,1fr)] lg:gap-8">
          <a href="#home" aria-label="Motor Teknika home" className="flex h-fit items-center gap-2.5 text-xl font-semibold">
            <span aria-hidden="true" className="h-7 w-6 shrink-0 bg-orange" style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }} />
            Motor <span className="text-orange">Teknika</span>
          </a>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="m-0 mb-5 text-sm font-medium text-text">{group.title}</h2>
              <ul className="m-0 grid list-none gap-3 p-0 text-sm text-muted">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href={linkTargets[link] ?? "#contact"} className="transition-colors hover:text-text">
                      {link}
                    </a>
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
