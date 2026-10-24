import { readdir, stat } from "fs/promises";
import { join } from "path";
import { integrations } from "@/data/integrations";
import IntegrationIcon from "@/components/ui/IntegrationIcon";

function BrandMark() {
  return (
    <span aria-hidden="true" className="block h-10 w-10 bg-orange" style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }} />
  );
}

const tilePositions = [
  "left-1/2 top-[10%]",
  "left-[18%] top-[33%]",
  "left-[82%] top-[33%]",
  "left-[19%] top-[71%]",
  "left-[82%] top-[71%]",
  "left-1/2 top-[90%]",
];

function IntegrationTile({ integration, index }: { integration: (typeof integrations)[number]; index: number }) {
  return (
    <li tabIndex={0} aria-label={`${integration.name}: ${integration.description}`} className={`integration-tile group absolute z-2 w-[31%] min-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-line bg-panel p-[10px_12px] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-x-1/2 hover:-translate-y-[calc(50%+4px)] hover:border-orange focus-visible:-translate-x-1/2 focus-visible:-translate-y-[calc(50%+4px)] focus-visible:border-orange ${tilePositions[index]}`}>
      <div className={`integration-tile-float integration-tile-float-${index} flex items-center gap-2.5`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange text-text"><IntegrationIcon type={integration.iconKey} /></span>
        <span className="min-w-0"><span className="block truncate text-[14px] font-semibold leading-tight text-text">{integration.name}</span><span className="block truncate text-[12px] leading-tight text-muted">{integration.description}</span></span>
      </div>
    </li>
  );
}

function ConnectionMap() {
  const paths = ["M265 230 L265 46", "M265 230 L95 152", "M265 230 L435 152", "M265 230 L100 325", "M265 230 L435 325", "M265 230 L265 414"];
  const inward = new Set([0, 3, 4]);

  return (
    <div className="relative hidden w-full overflow-visible lg:block" style={{ aspectRatio: "530 / 460" }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 530 460" aria-hidden="true">
        <circle cx="265" cy="230" r="165" fill="none" stroke="var(--orange)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="265" cy="230" r="225" fill="none" stroke="var(--orange)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 7"><animateTransform className="integration-ring-motion" attributeName="transform" attributeType="XML" type="rotate" from="0 265 230" to="360 265 230" dur="60s" repeatCount="indefinite" /></circle>
        {paths.map((path, index) => {
          const motionPath = inward.has(index) ? `${path.slice(path.indexOf("L") + 1)} L265 230` : path;
          return <g key={path}><path d={path} fill="none" stroke="var(--orange)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 6" /><circle className="integration-map-dot" r="3.5" fill="var(--orange)"><animateMotion dur={`${3 + (index % 2) * 0.5}s`} repeatCount="indefinite"><mpath href={`#integration-path-${index}`} /></animateMotion></circle><path id={`integration-path-${index}`} d={motionPath} fill="none" stroke="none" /></g>;
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 z-1 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="integration-center relative flex h-[98px] w-[98px] items-center justify-center rounded-[22px] border border-orange bg-panel"><BrandMark /></div>
        <span className="absolute top-[calc(100%+12px)] whitespace-nowrap text-[12px] text-muted">Two-way sync</span>
      </div>
      <ul className="absolute inset-0 m-0 list-none p-0" aria-label="Connected systems">
        {integrations.map((integration, index) => <IntegrationTile key={integration.id} integration={integration} index={index} />)}
      </ul>
    </div>
  );
}

function MobileConnectionMap() {
  return (
    <div className="lg:hidden">
      <div className="flex flex-col items-center"><div className="integration-center flex h-16 w-16 items-center justify-center rounded-2xl border border-orange bg-panel"><BrandMark /></div><span className="mt-2 text-[12px] text-muted">Two-way sync</span><span className="my-3 h-8 w-px bg-orange" aria-hidden="true" /></div>
      <ul className="grid grid-cols-2 gap-3 p-0" aria-label="Connected systems">
        {integrations.map((integration, index) => <li key={integration.id} tabIndex={0} aria-label={`${integration.name}: ${integration.description}`} className="integration-tile group rounded-[10px] border border-line bg-panel p-3 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-orange focus-visible:-translate-y-1 focus-visible:border-orange"><div className={`integration-tile-float integration-tile-float-${index} flex flex-col items-center gap-2 text-center`}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange text-text"><IntegrationIcon type={integration.iconKey} /></span><span className="text-[13px] font-semibold leading-tight text-text">{integration.name}</span><span className="text-[11px] leading-tight text-muted">{integration.description}</span></div></li>)}
      </ul>
    </div>
  );
}

/* Server-side partner logo loader */
async function loadPartnerLogos(): Promise<Array<{ name: string; src: string }>> {
  try {
    const partnersPath = "public/partners";
    const files = await readdir(partnersPath);
    const logoPromises = files.map(async (file) => {
      const filePath = join(partnersPath, file);
      const stats = await stat(filePath);

      if (stats.isFile() && /\.(png|webp|svg)$/i.test(file)) {
        return { name: file, src: filePath };
      }
      return null;
    });

    const logos = await Promise.all(logoPromises);
    return logos.filter((logo): logo is { name: string; src: string } => logo !== null);
  } catch {
    // folder empty or missing - return empty array
    return [];
  }
}

export default async function Integrations() {
  // Load partner logos on the server
  const partnerLogos = await loadPartnerLogos();

  return (
    <section id="integrations" aria-labelledby="integrations-heading" className="border-b border-line py-16">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Content grid: text left, map right from 1024px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text block */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="text-[10px] font-semibold tracking-[0.14em] text-orange mb-3 uppercase">
              INTEGRATIONS
            </div>

            {/* Heading */}
            <h2
              id="integrations-heading"
              className="text-balance text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.01em] leading-[1.1] m-0 mb-3"
            >
              Plugs into the systems you already use
            </h2>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-5">
              Motor Teknika connects to your current tools through a secure API. Keep the systems you already use and add valuation, masking and auctions on top.
            </p>

            {/* Three points with orange checkmarks */}
            <ul className="list-none p-0 m-0 mb-6 space-y-3">
              <li className="flex items-start gap-2.5 text-muted text-xs">
                <span className="text-orange text-sm mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>Secure, flexible API</span>
              </li>
              <li className="flex items-start gap-2.5 text-muted text-xs">
                <span className="text-orange text-sm mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>Real-time data sync</span>
              </li>
              <li className="flex items-start gap-2.5 text-muted text-xs">
                <span className="text-orange text-sm mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>Our team helps you connect</span>
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded bg-orange text-white text-sm font-semibold hover:bg-orange-hover transition-colors"
              >
                Talk to us about integration →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded border border-line-strong text-text text-sm font-medium hover:border-orange hover:text-orange transition-colors"
              >
                Book a Demo
              </a>
            </div>

            {/* Caption */}
          </div>

          {/* Right: Connection map */}
          <div className="order-1 lg:order-2 relative">
            <ConnectionMap />
            <MobileConnectionMap />
            <p className="mt-4 text-xs text-muted lg:mt-3">Examples of what can connect.</p>
          </div>
        </div>

        {/* Partner logo strip */}
        <div className="mt-12">
          {/* Only render if partner logos exist */}
          {partnerLogos.length > 0 && (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              role="list"
              aria-label="Partner logos"
            >
              {partnerLogos.map(({ name, src }) => {
                // For WebP and PNG files, use inline img (simpler than Image wrapper)
                const isSvg = name.toLowerCase().endsWith(".svg");

                return isSvg ? (
                  <li
                    key={name}
                    className="border border-line rounded-lg p-4 bg-panel hover:bg-panel2 transition-colors"
                    style={{ width: "120px", height: "72px" }}
                  >
                    <img
                      src={src}
                      alt={name}
                      className="w-full h-full object-contain"
                    />
                  </li>
                ) : (
                  <li
                    key={name}
                    className="border border-line rounded-lg p-2 bg-panel hover:bg-panel2 transition-colors"
                    style={{ width: "120px", height: "72px" }}
                  >
                    <img
                      src={src}
                      alt={name}
                      className="w-full h-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                    />
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-3 text-[11px] text-muted">
            Only add logos of partners we really integrate with, and get permission to display them.
          </p>
        </div>
      </div>
    </section>
  );
}