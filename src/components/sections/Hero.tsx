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
          className="hidden lg:block relative"
          style={{ height: "370px" }}
        >
          {/* Laptop – 78% wide */}
          <div
            className="absolute top-0 right-0 w-[78%]"
          >
            {/* Screen bezel */}
            <div
              className="bg-[#05070a] border-[7px] border-[#1b1f27] border-b-[9px] rounded-[12px_12px_0_0] overflow-hidden"
              style={{ boxShadow: "0 30px 70px #000, 0 0 60px rgba(255,106,19,0.22)" }}
            >
              {/* Screen content */}
              <div className="h-[170px] bg-[#0c1017] p-[6px] grid grid-cols-[34px_1fr_78px] gap-[6px] text-[7px] text-muted">
                {/* Sidebar */}
                <div className="bg-[#10151d] rounded p-[5px] space-y-[6px]">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[4px] bg-[#232b38] rounded" />
                  ))}
                </div>
                {/* Main */}
                <div className="bg-[#10151d] rounded p-[5px]">
                  <div className="h-[62px] bg-[#161c26] rounded mb-[5px] flex items-center justify-center">
                    <svg viewBox="0 0 400 170" className="w-full h-full opacity-60" aria-hidden="true">
                      <path d="M14 118l10-26q6-14 22-18l50-12 34-30q8-8 22-8h120q16 0 28 10l32 30 38 8q16 4 18 22l4 24H14z" fill="#1a1f29"/>
                      <circle cx="96" cy="130" r="18" fill="#07090c"/>
                      <circle cx="308" cy="130" r="18" fill="#07090c"/>
                    </svg>
                  </div>
                  <div className="text-[6px] text-muted mb-1">Toyota Land Cruiser 2022</div>
                  <div className="space-y-[4px]">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-[4px] bg-[#232b38] rounded" style={{ width: `${70 - i * 15}%` }} />
                    ))}
                  </div>
                </div>
                {/* Right panel */}
                <div className="bg-[#10151d] rounded p-[5px]">
                  <div className="text-muted text-[6px] mb-[2px]">Current Bid</div>
                  <div className="text-[15px] font-bold text-text leading-none mb-[8px]">$24,500</div>
                  <div className="space-y-[4px]">
                    <div className="h-[5px] bg-green rounded w-[70%]" />
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-[5px] bg-[#232b38] rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Silver base */}
            <div className="h-[11px] mx-[-2%] bg-gradient-to-b from-[#d3d8e1] to-[#8b92a0] rounded-b-[14px] shadow-[0_14px_30px_#000]" />
          </div>

          {/* Tablet – bottom left, 44% */}
          <div
            className="absolute left-0 bottom-[4%] w-[44%] bg-[#0b0d12] border-[6px] border-[#1b1f27] rounded-[16px] overflow-hidden"
            style={{ boxShadow: "0 26px 60px #000, 0 0 0 1px #3a4352" }}
          >
            <div className="h-[80px] bg-[#161c26] m-[4px] rounded-[8px]" />
            <div className="px-[8px] pb-[6px] space-y-[5px]">
              <div className="h-[5px] bg-[#1c232e] rounded" />
              <div className="h-[5px] bg-[#1c232e] rounded w-3/4" />
            </div>
          </div>

          {/* Phone – bottom right 21%, bronze bezel */}
          <div
            className="absolute right-0 bottom-0 w-[21%] min-w-[96px] bg-[#0a0d12] border-[4px] border-[#b8693a] rounded-[20px] overflow-hidden"
            style={{ boxShadow: "0 26px 60px #000" }}
          >
            {/* Notch */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[34%] h-[7px] bg-black rounded-[6px] z-10" />
            <div className="h-[100px] bg-[#161c26] m-[6px] mt-[16px] rounded-[6px]" />
            <div className="px-[6px] pb-[8px] space-y-[4px]">
              <div className="h-[4px] bg-[#1c232e] rounded" />
              <div className="h-[4px] bg-[#1c232e] rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Where We Work bar */}
      <WhereWeWork />
    </section>
  );
}
