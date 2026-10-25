"use client";

import type { ReactNode } from "react";
import Image             from "next/image";
import LocaleLink        from "@/components/ui/LocaleLink";
import FlipCard           from "@/components/ui/FlipCard";
import Badge              from "@/components/ui/Badge";
import Tag                from "@/components/ui/Tag";
import type { Service }   from "@/data/services";
import { format, type Dictionary } from "@/data/dictionaries";
import { useDictionary }  from "@/data/dictionaries/useDictionary";

/* Front preview graphics */
import EvaluationPreview from "@/components/previews/EvaluationPreview";
import AuctionPreview    from "@/components/previews/AuctionPreview";
import ApiPreview        from "@/components/previews/ApiPreview";
import EcosystemPreview  from "@/components/previews/EcosystemPreview";
import MaskingTechDemo    from "@/components/previews/MaskingTechDemo";

type PreviewLabels = Dictionary["services"]["previews"];

const previewMap: Record<string, (labels: PreviewLabels) => ReactNode> = {
  evaluation: (labels) => <EvaluationPreview labels={labels.evaluation} />,
  auction:    (labels) => <AuctionPreview labels={labels.auction} />,
  api:        (labels) => <ApiPreview labels={labels.api} />,
  ecosystem:  () => <EcosystemPreview />,
};

/* Shared ghost button used on both front and back */
function GhostBtn({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
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
      className="rtl:-scale-x-100"
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
  const t = useDictionary().services;
  const copy = t.items[service.id];
  const name = copy.title.join("").replace(/\s+/g, " ");
  const badge = "badge" in copy ? copy.badge : service.isNew ? t.new : undefined;

  /* Ecosystem is full-width with horizontal desktop layout, handled in Services.tsx */
  const isFeatured = service.featured;

  return (
    <FlipCard
      className={[
        "h-full rounded-[4px] shadow-md transition-all duration-200",
        isFeatured
          ? "bg-gradient-to-r from-featured-from to-panel"
          : "bg-gradient-to-b from-panel2 to-panel",
        "hover:shadow-[0_0_0_2px_var(--orange)] hover:-translate-y-[2px]",
      ].join(" ")}
      front={({ flip }) => (
        <div className={[
          "flex flex-col h-full p-6",
          isFeatured ? "sm:flex-row sm:gap-8" : "",
        ].join(" ")}>

          {/* ── Image area – badge sits in the corner so titles line up across cards ── */}
          <div className={[
            "relative shrink-0 rounded bg-panel2 overflow-hidden",
            "shadow-[0_0_24px_rgba(255,106,19,0.06)]",
            "flex items-center justify-center",
            isFeatured
              ? "h-[220px] mb-5 sm:mb-0 sm:h-auto sm:w-[40%] sm:self-stretch"
              : "h-[220px] mb-5",
          ].join(" ")}>
            {service.previewImage ? (
              service.id === "masking" ? (
                <MaskingTechDemo />
              ) : (
                <Image
                  src={service.previewImage.src}
                  alt={"imageAlt" in copy ? copy.imageAlt : ""}
                  width={service.previewImage.width}
                  height={service.previewImage.height}
                  sizes="(min-width: 1280px) 270px, (min-width: 640px) 50vw, 100vw"
                  className="block h-full w-full object-contain"
                />
              )
            ) : (
              previewMap[service.id]?.(t.previews)
            )}
            {badge && (
              <span className="absolute top-3 end-3">
                <Badge label={badge} />
              </span>
            )}
          </div>

          {/* ── Text block ── */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Eyebrow */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted mb-2 mt-0">
              {copy.eyebrow}
            </p>

            <div className="mb-2">
              <CardTitle title={copy.title} />
            </div>

            {/* Description – wraps freely, no clamp */}
            <p className="text-[14px] text-muted leading-relaxed mb-6">
              {copy.description}
            </p>

            {/* Ecosystem item grid (featured only) */}
            {isFeatured && "items" in copy && (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 list-none p-0 m-0 -mt-2 mb-6 text-[11px] text-muted">
                {copy.items.map((item) => (
                  <li key={item.label}>
                    <b className="block text-text text-[12px] mb-[2px]">{item.label}</b>
                    {item.description}
                  </li>
                ))}
              </ul>
            )}

            {/* ── Bottom row – mt-auto pins it to the card bottom ── */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
              <GhostBtn onClick={flip} ariaLabel={format(t.previewDetailsFor, { name })}>
                {t.previewDetails} <ArrowRight />
              </GhostBtn>
            </div>
          </div>
        </div>
      )}
      back={({ unflip }) => (
        <div className="flex flex-col h-full p-6">
          {/* Tag pill – auto width, left aligned */}
          <Tag
            variant={service.badgeType}
            label={service.badgeType === "sold" ? t.soldSeparately : t.packageOnly}
            className="self-start mb-3"
          />

          {/* Title */}
          <div className="mb-3">
            <CardTitle title={copy.title} />
          </div>

          {/* Full description */}
          <p className="text-[14px] text-muted leading-relaxed mb-0">
            {copy.backDescription}
          </p>

          {/* Bullets with orange ✓ */}
          <ul className="list-none p-0 m-0 mt-4 mb-6 space-y-2">
            {copy.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[13px] text-text">
                <span className="text-orange mt-[1px] shrink-0" aria-hidden="true">✓</span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* ── Bottom row – same position as front ── */}
          <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-line">
            <GhostBtn onClick={unflip} ariaLabel={format(t.backTo, { name })}>
              {t.back}
            </GhostBtn>

            {/* Link for API card only */}
            {service.id === "api" && (
              <LocaleLink
                href="/#integrations"
                onClick={(e) => {
                  const integrationsSection = document.getElementById("integrations");
                  if (!integrationsSection) return;
                  e.preventDefault();
                  unflip();
                  integrationsSection.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[11px] font-semibold text-orange hover:text-white transition-colors flex items-center gap-1"
              >
                {t.seeConnects}
              </LocaleLink>
            )}
          </div>
        </div>
      )}
    />
  );
}
