import Image from "next/image";
import WhereWeWork from "@/components/sections/WhereWeWork";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-line"
      style={{
        background:
          "radial-gradient(ellipse 40% 70% at 62% 50%, rgba(255,106,19,0.2), transparent 70%), linear-gradient(180deg,#0a0d12,#07090d)",
      }}
    >
      {/* Two glowing vertical lines – hidden on mobile */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute top-0 bottom-0 w-[3px] left-[56%] opacity-70"
        style={{
          background:
            "linear-gradient(180deg,transparent,rgba(255,130,40,0.8),transparent)",
          filter: "blur(3px)",
        }}
      />
      <span
        aria-hidden="true"
        className="hidden lg:block absolute top-0 bottom-0 w-[3px] left-[68%] opacity-70"
        style={{
          background:
            "linear-gradient(180deg,transparent,rgba(255,130,40,0.8),transparent)",
          filter: "blur(3px)",
        }}
      />

      {/* Grid content */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 pt-14 pb-9 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 items-center min-h-[395px]">
        {/* ── Left column ── */}
        <div>
          {/* Tags row */}
          <div className="flex flex-wrap gap-3 mb-[14px] text-[10px] font-semibold tracking-[0.14em] text-orange uppercase">
            <span>AI Powered</span>
            <span>➜ Real-Time Auctions</span>
            <span>➜ White-Label</span>
          </div>

          {/* H1 */}
          <h1 className="text-[clamp(38px,5vw,56px)] leading-[1] tracking-[-0.025em] font-bold m-0 mb-5">
            The Complete Automotive Trade{" "}
            <em className="not-italic text-orange block">Ecosystem.</em>
          </h1>

          {/* Lead */}
          <p className="text-[13px] text-[#c9cfd9] max-w-[360px] mb-[22px]">
            Motor Teknika brings together AI, real-time bidding and smart automation
            to help you source, value, and sell vehicles faster — all under your own brand.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-[34px]">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-[11px] rounded bg-orange text-white text-[13px] font-semibold hover:bg-orange-hover transition-colors"
            >
              Explore Our Solutions →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-[11px] rounded border border-[#4a5262] text-white text-[13px] font-semibold hover:border-orange transition-colors"
            >
              ▦&nbsp; Book a Demo
            </a>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap gap-[26px] text-[11px] text-muted">
            {[
              {
                label: "White-label platform",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-orange fill-none stroke-[1.6]">
                    <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/>
                    <path d="M8.5 12l2.5 2.5 4.5-5"/>
                  </svg>
                ),
              },
              {
                label: "Secure & scalable",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-orange fill-none stroke-[1.6]">
                    <rect x="5" y="11" width="14" height="10" rx="2"/>
                    <path d="M8 11V8a4 4 0 018 0v3"/>
                  </svg>
                ),
              },
              {
                label: "Built for global markets",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-orange fill-none stroke-[1.6]">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <span key={label} className="flex items-center gap-2">
                {icon}
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column: device composite ── */}
        <div
          aria-hidden="true"
          className="relative hidden lg:block lg:h-[430px] lg:-ml-8"
        >
          {/* Laptop – large central display */}
          <div
            className="absolute left-[7%] top-0 w-[88%]"
          >
            <Image src="/images/laptop-transparent.png" alt="Motor Teknika live bidding dashboard" width={1024} height={687} className="block h-auto w-full" priority />
          </div>

          {/* Tablet – overlapping lower left */}
          <div
            className="absolute bottom-[2%] left-0 w-[49%]"
          >
            <Image src="/images/ipad-transparent.png" alt="Motor Teknika analytics dashboard on tablet" width={1024} height={687} className="block h-auto w-full" />
          </div>

          {/* Phone – overlapping lower right */}
          <div
            className="absolute bottom-0 right-0 w-[24%] min-w-[120px]"
          >
            <Image src="/images/mobile-transparent.png" alt="Motor Teknika live auction app on mobile" width={687} height={1024} className="block h-auto w-full" />
          </div>
        </div>
      </div>

      {/* Where We Work bar */}
      <WhereWeWork />
    </section>
  );
}
