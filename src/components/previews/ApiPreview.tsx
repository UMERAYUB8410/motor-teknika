"use client";

import { useEffect, useState } from "react";
import { type Dictionary } from "@/data/dictionaries";

type Labels = Dictionary["services"]["previews"]["api"];
type Phase = "idle" | "sending" | "done";

/** API Integration front preview: send a request and watch the response come back */
export default function ApiPreview({ labels: t }: { labels: Labels }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [latency, setLatency] = useState(142);

  useEffect(() => {
    if (phase !== "sending") return;
    const reply = setTimeout(() => setPhase("done"), 900);
    return () => clearTimeout(reply);
  }, [phase]);

  function send() {
    setLatency(110 + Math.floor(Math.random() * 70));
    setPhase("sending");
  }

  return (
    <div className="w-full h-full flex flex-col p-4 text-start">
      {/* Your system ⇄ Motor Teknika, with a packet travelling while the request is in flight */}
      <div className="flex items-center gap-2 text-[9px] font-medium">
        <span className="shrink-0 rounded border border-line bg-panel px-1.5 py-1 text-muted">{t.yourCrm}</span>
        <span className="relative h-px flex-1 border-t border-dashed border-line-strong rtl:-scale-x-100" aria-hidden="true">
          {phase === "sending" && (
            <span className="absolute -top-[3px] h-[5px] w-[5px] rounded-full bg-orange motion-safe:animate-[api-packet_900ms_linear]" />
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded border border-orange bg-panel px-1.5 py-1 text-text">
          <span
            aria-hidden="true"
            className="h-2.5 w-2 bg-orange"
            style={{ clipPath: "polygon(0 0, 75% 0, 100% 28%, 45% 100%, 45% 58%, 0 58%)" }}
          />
          API
        </span>
      </div>

      {/* Request and response – code always reads left-to-right */}
      <div dir="ltr" className="mt-3 rounded border border-line bg-bg p-2 font-mono text-[9px] leading-[1.6] text-muted text-left whitespace-pre overflow-hidden">
        <div><span className="text-orange">POST</span> <span className="text-text">/v1/valuations</span></div>
        <div>{`{ "vin": "JTM…", "km": 45000 }`}</div>
        <div className="my-1 border-t border-line" />
        {phase === "idle" && <div className="text-line-strong">{"// waiting for request"}</div>}
        {phase === "sending" && <div className="motion-safe:animate-pulse">…</div>}
        {phase === "done" && (
          <div className="motion-safe:animate-[bid-in_300ms_ease-out]">
            <div><span className="text-green">200 OK</span> · {latency} ms</div>
            <div className="text-text">{`{ "price": 18750,`}</div>
            <div className="text-text">{`  "status": "synced" }`}</div>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={send}
          disabled={phase === "sending"}
          className="shrink-0 rounded border border-orange px-2.5 py-1 text-[10px] font-semibold text-text transition-colors hover:bg-orange/15 disabled:opacity-60"
        >
          {phase === "sending" ? t.sending : phase === "done" ? t.sendAgain : t.send}
        </button>
        <span className="truncate text-[9px] font-medium text-green" aria-live="polite">
          {phase === "done" && <>✓ {t.synced}</>}
        </span>
      </div>
    </div>
  );
}
