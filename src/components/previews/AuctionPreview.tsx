"use client";

import { useEffect, useRef, useState } from "react";
import { format, type Dictionary } from "@/data/dictionaries";
import { formatUsd } from "@/components/previews/formatUsd";

type Labels = Dictionary["services"]["previews"]["auction"];

const INCREMENT = 250;
const DURATION = 45;
/* A bid in the last seconds extends the clock, like a real anti-sniping rule */
const EXTEND_TO = 15;
/* The rival dealer answers your first bids, then lets you win */
const RIVAL_REPLIES = 2;

/** "you" or an index into labels.dealers */
type Bidder = "you" | number;
type Bid = { id: number; bidder: Bidder; amount: number };

const startingBids: Bid[] = [
  { id: 3, bidder: 0, amount: 24500 },
  { id: 2, bidder: 1, amount: 24250 },
  { id: 1, bidder: 2, amount: 24000 },
];

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** Auction Platform front preview: a live mini auction you can bid in */
export default function AuctionPreview({ labels: t }: { labels: Labels }) {
  const [bids, setBids] = useState(startingBids);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [rivalReplies, setRivalReplies] = useState(0);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const top = bids[0];
  const ended = secondsLeft === 0;
  const youBid = bids.some((b) => b.bidder === "you");
  const youLead = top.bidder === "you";

  /* Only run the clock while the card is on screen */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || ended) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [visible, ended]);

  /* A rival dealer outbids you a couple of times */
  useEffect(() => {
    if (!youLead || ended || rivalReplies >= RIVAL_REPLIES) return;
    const reply = setTimeout(() => {
      setBids((prev) => [
        { id: prev[0].id + 1, bidder: rivalReplies % 2, amount: prev[0].amount + INCREMENT },
        ...prev,
      ].slice(0, 3));
      setRivalReplies((n) => n + 1);
    }, 1800);
    return () => clearTimeout(reply);
  }, [youLead, ended, rivalReplies]);

  function placeBid() {
    if (ended) {
      setBids(startingBids);
      setSecondsLeft(DURATION);
      setRivalReplies(0);
      return;
    }
    setBids((prev) => [
      { id: prev[0].id + 1, bidder: "you" as const, amount: prev[0].amount + INCREMENT },
      ...prev,
    ].slice(0, 3));
    setSecondsLeft((s) => Math.max(s, EXTEND_TO));
  }

  const status = ended
    ? (youLead ? t.won : t.lost)
    : youLead ? t.winning : youBid ? t.outbid : "";
  const statusColor = youLead ? "text-green" : "text-orange";

  return (
    <div ref={rootRef} className="w-full h-full flex flex-col p-4 text-start">
      <div className="flex items-center justify-between gap-2 text-[10px] text-muted">
        <span>{t.currentBid}</span>
        <span
          className={[
            "shrink-0 rounded-full px-1.5 py-[1px] text-[9px] font-semibold tabular-nums",
            ended ? "bg-line text-muted" : secondsLeft <= 10 ? "bg-orange/20 text-orange" : "bg-panel text-text",
          ].join(" ")}
        >
          {ended ? t.ended : format(t.endsIn, { time: formatTime(secondsLeft) })}
        </span>
      </div>

      <div
        key={top.id}
        className="text-[24px] font-bold leading-tight text-text tabular-nums motion-safe:animate-[bid-flash_700ms_ease-out]"
      >
        {formatUsd(top.amount)}
      </div>
      <div className={`h-4 text-[10px] font-medium ${statusColor}`} aria-live="polite">
        {status}
      </div>

      {/* Latest bids, newest first */}
      <ul className="mt-1 grid gap-1 list-none p-0 m-0">
        {bids.map((b) => (
          <li
            key={b.id}
            className={[
              "flex items-center justify-between rounded px-2 py-[3px] text-[10px] tabular-nums motion-safe:animate-[bid-in_300ms_ease-out]",
              b.bidder === "you" ? "bg-orange/15 text-text" : "bg-panel text-muted",
            ].join(" ")}
          >
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${b.bidder === "you" ? "bg-orange" : "bg-line-strong"}`}
              />
              {b.bidder === "you" ? t.you : t.dealers[b.bidder]}
            </span>
            {formatUsd(b.amount)}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={placeBid}
        className="mt-auto w-full rounded bg-orange py-1.5 text-[11px] font-semibold text-text transition-colors hover:bg-orange-hover active:scale-[0.98]"
      >
        {/* \u2066…\u2069 isolates "+$250" so Arabic text can't reorder it */}
        {ended ? t.restart : format(t.bid, { amount: `\u2066+${formatUsd(INCREMENT)}\u2069` })}
      </button>
    </div>
  );
}
