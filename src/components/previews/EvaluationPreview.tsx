"use client";

import { useEffect, useRef, useState } from "react";
import { format, type Dictionary } from "@/data/dictionaries";
import { formatUsd } from "@/components/previews/formatUsd";

type Labels = Dictionary["services"]["previews"]["evaluation"];

/* Sample valuations for one car at three mileages */
const options = [
  { km: 20, price: 21400, confidence: 94 },
  { km: 45, price: 18750, confidence: 92 },
  { km: 90, price: 15200, confidence: 88 },
];
const SPREAD = 0.045;
/* The range bar spans every option, so the marker visibly moves when mileage changes */
const BAR_MIN = options[2].price * (1 - SPREAD);
const BAR_MAX = options[0].price * (1 + SPREAD);
const toPct = (value: number) => ((value - BAR_MIN) / (BAR_MAX - BAR_MIN)) * 100;

/** Animates a number towards `target` (instantly when the visitor prefers reduced motion) */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    const from = shown.current;
    if (from === target) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 600;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = duration ? Math.min(1, (now - start) / duration) : 1;
      shown.current = Math.round(from + (target - from) * (1 - (1 - progress) ** 3));
      setValue(shown.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

/** Evaluation Engine front preview: pick a mileage and the likely sale price updates */
export default function EvaluationPreview({ labels: t }: { labels: Labels }) {
  const [selected, setSelected] = useState(1);
  const option = options[selected];
  const low = Math.round(option.price * (1 - SPREAD) / 50) * 50;
  const high = Math.round(option.price * (1 + SPREAD) / 50) * 50;
  const shownPrice = useCountUp(option.price);

  return (
    <div className="w-full h-full flex flex-col p-4 text-start">
      {/* pe-14 keeps the car name clear of the card's corner badge */}
      <div className="truncate pe-14 text-[10px] text-muted">{t.car}</div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-muted">
        <span>{t.likelySale}</span>
        <span className="shrink-0 rounded-full bg-green/15 px-1.5 py-[1px] text-[9px] font-semibold text-green tabular-nums">
          {format(t.confidence, { value: option.confidence })}
        </span>
      </div>
      <div className="text-[26px] font-bold leading-tight text-text tabular-nums" aria-hidden="true">
        {formatUsd(shownPrice)}
      </div>
      <span className="sr-only" aria-live="polite">{formatUsd(option.price)}</span>

      {/* Price range bar with a marker at the likely price */}
      <div className="mt-3">
        <div className="relative h-[6px] rounded-full bg-line">
          <div
            className="absolute inset-y-0 rounded-full bg-orange/35 transition-all duration-500"
            style={{ insetInlineStart: `${toPct(low)}%`, width: `${toPct(high) - toPct(low)}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-full border-2 border-orange bg-bg transition-all duration-500"
            style={{ insetInlineStart: `${toPct(option.price)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] text-muted tabular-nums">
          <span>{formatUsd(low)}</span>
          <span>{t.range}</span>
          <span>{formatUsd(high)}</span>
        </div>
      </div>

      {/* Mileage picker */}
      <div className="mt-auto" role="group" aria-label={t.mileage}>
        <div className="mb-1 text-[9px] text-muted">{t.mileage}</div>
        <div className="grid grid-cols-3 gap-1">
          {options.map((o, i) => (
            <button
              key={o.km}
              type="button"
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
              className={[
                "rounded border px-1 py-1 text-[10px] font-medium transition-colors",
                i === selected
                  ? "border-orange bg-orange/15 text-text"
                  : "border-line text-muted hover:border-line-strong hover:text-text",
              ].join(" ")}
            >
              {format(t.km, { value: o.km })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
