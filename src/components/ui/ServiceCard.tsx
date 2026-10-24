"use client";

import type { ReactNode } from "react";
import Image             from "next/image";
import FlipCard           from "@/components/ui/FlipCard";
import Badge              from "@/components/ui/Badge";
import Tag                from "@/components/ui/Tag";
import ImagePlaceholder   from "@/components/ui/ImagePlaceholder";
import type { Service }   from "@/data/services";

/* Front preview graphics */
import EvaluationPreview from "@/components/previews/EvaluationPreview";
import MaskingPreview    from "@/components/previews/MaskingPreview";
import AuctionPreview    from "@/components/previews/AuctionPreview";
import ApiPreview        from "@/components/previews/ApiPreview";
import EcosystemPreview  from "@/components/previews/EcosystemPreview";

const previewMap: Record<string, ReactNode> = {
  evaluation: <EvaluationPreview />,
  masking:    <MaskingPreview />,
  auction:    <AuctionPreview />,
  api:        <ApiPreview />,
  ecosystem:  <EcosystemPreview />,
};

/* Shared ghost button used on both front and back */
function GhostBtn({
  onClick,
  ariaLabel,
  ariaExpanded,
  children,
  onMouseEnter,
}: {
  onClick: () => void;
  ariaLabel: string;
  ariaExpanded: boolean;
  children: React.ReactNode;
  onMouseEnter?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      onMouseEnter={onMouseEnter}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-line-strong text-[11px] font-semibold text-text hover:border-orange hover:text-orange transition-colors"
    >
      {children}
    </button>
  );
}

/* Thin right-arrow icon used on the front bottom row */
function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Title rendered the same way on front and back */
function CardTitle({ title }: { title: [string, string?] }) {
  return (
    <h3 className="text-[22px] font-light text-text leading-tight m-0">
      {title[0]}
      {title[1] && <strong className="font-semibold">{title[1]}</strong>}
    </h3>
  );
}

export default function ServiceCard({ service }: { service: Service }) {
  const preview = previewMap[service.id];

  /* Ecosystem is full-width with horizontal desktop layout, handled in Services.tsx */
  const isFeatured = service.featured;

  return (
    <FlipCard
      className={[
        "h-full rounded-[4px] shadow-md transition-all duration-200",
        isFeatured
          ? "bg-gradient-to-r from-featured-from to-panel"
          : "bg-gradient-to-b from-panel2 to-panel",
        "hover:shadow-[0_0_0_2px_theme(colors.orange)] hover:-translate-y-[2px]",
      ].join(" ")}
      front={({ flip }) => (
        <div className={[
          "flex flex-col h-full p-6",
          isFeatured ? "sm:flex-row sm:gap-8" : "",
        ].join(" ")}>

          {/* ── Image area ── */}
          <div className={[
            "shrink-0 rounded bg-panel2 overflow-hidden",
            "shadow-[0_0_24px_rgba(255,106,19,0.06)]",
            "flex items-center justify-center",
            isFeatured
              ? "h-[220px] sm:h-auto sm:w-[40%] sm:self-stretch"
              : "h-[220px] mb-5",
          ].join(" ")}>
            {preview}
          </div>

          {/* ── Text block ── */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Eyebrow */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted mb-2 mt-0">
              {service.eyebrow}
            </p>

            {/* Title + badge – flex-wrap so badge falls under on narrow cards */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
              <CardTitle title={service.title} />
              {service.isNew && (
                <Badge label={service.newBadge ?? "NEW"} />
              )}
            </div>

            {/* Description – wraps freely, no clamp */}
            <p className="text-[14px] text-muted leading-relaxed mb-0">
              {service.description}
            </p>

            {/* Ecosystem item grid (featured only) */}
            {isFeatured && service.items && (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 list-none p-0 m-0 mt-4 text-[11px] text-muted">
                {service.items.map((item) => (
                  <li key={item.label}>
                    <b className="block text-text text-[12px] mb-[2px]">{item.label}</b>
                    {item.description}
                  </li>
                ))}
              </ul>
            )}

            {/* ── Bottom row – mt-auto pins it to the card bottom ── */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
              <GhostBtn
                onClick={flip}
                ariaLabel={`Preview details for ${service.title[0]}${service.title[1] ?? ""}`}
                ariaExpanded={false}
                onMouseEnter={flip}
              >
                Preview details <ArrowRight />
              </GhostBtn>
            </div>
          </div>
        </div>
      )}
      back={({ unflip }) => (
        <div className={[
          "flex flex-col h-full p-6",
          isFeatured ? "sm:flex-row sm:gap-8" : "",
        ].join(" ")}>

          {/* ── Back image (same height as front image) ── */}
          <div className={[
            "relative shrink-0 overflow-hidden rounded bg-panel2",
            isFeatured
              ? "h-[220px] sm:h-auto sm:w-[40%] sm:self-stretch"
              : "h-[220px]",
          ].join(" ")}>
            {service.id === "masking" ? (
                <div className="h-full w-full p-2">
                  <Image
                    src="/images/masking.png"
                    alt="MaskingTech before and after vehicle image processing"
                    width={1024}
                    height={576}
                    className="h-full w-full object-contain"
                  />
                </div>
            ) : (
              <ImagePlaceholder className="h-full" />
            )}
          </div>

          {/* ── Text block ── */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Tag pill – auto width, left aligned */}
            <Tag variant={service.badgeType} className="mt-4 sm:mt-0 mb-3" />

            {/* Title */}
            <div className="mb-3">
              <CardTitle title={service.title} />
            </div>

            {/* Full description */}
            <p className="text-[14px] text-muted leading-relaxed mb-0">
              {service.backDescription}
            </p>

            {/* Bullets with orange ✓ */}
            <ul className="list-none p-0 m-0 mt-4 space-y-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-[13px] text-text">
                  <span className="text-orange mt-[1px] shrink-0" aria-hidden="true">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* ── Bottom row – same position as front ── */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
              {/* Link for API card only */}
              {service.id === "api" && (
                <a
                  href="#integrations"
                  onClick={(e) => {
                    e.preventDefault();
                    unflip();
                    const integrationsSection = document.getElementById("integrations");
                    integrationsSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[11px] font-semibold text-orange hover:text-white transition-colors flex items-center gap-1"
                  aria-label="See how API Integration connects to your systems"
                >
                  See how it connects ↓
                </a>
              )}

              <GhostBtn
                onClick={unflip}
                ariaLabel="Back to front"
                ariaExpanded={true}
              >
                Back ↻
              </GhostBtn>
            </div>
          </div>
        </div>
      )}
    />
  );
}
