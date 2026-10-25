"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

interface FlipCardProps {
  front: (controls: FlipControls) => ReactNode;
  back:  (controls: FlipControls) => ReactNode;
  className?: string;
}

export interface FlipControls {
  flip:      () => void;
  unflip:    () => void;
  isFlipped: boolean;
}

export default function FlipCard({ front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const id = useId();

  /* The hidden face is inert, so move focus to the first control on the visible face */
  const flipTo = useCallback((next: boolean) => {
    flushSync(() => setFlipped(next));
    document
      .getElementById(`${id}-${next ? "back" : "front"}`)
      ?.querySelector<HTMLElement>("button, a[href]")
      ?.focus({ preventScroll: true });
  }, [id]);

  const flip   = useCallback(() => flipTo(true),  [flipTo]);
  const unflip = useCallback(() => flipTo(false), [flipTo]);

  /* Escape key unflips */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && flipped) unflip();
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [flipped, unflip]);

  /* Mouse: unflip when pointer leaves the card */
  const handleMouseLeave = useCallback(() => {
    setFlipped(false);
  }, []);

  const controls: FlipControls = { flip, unflip, isFlipped: flipped };

  return (
    <div
      ref={cardRef}
      className={[
        "is-flip-card relative",
        flipped ? "is-flipped" : "",
        className ?? "",
      ].join(" ")}
      onMouseLeave={handleMouseLeave}
    >
      {/* perspective wrapper – 3D transform lives in .flipper CSS class */}
      <div className="flipper w-full h-full" style={{ perspective: "1400px" }}>
        {/* FRONT */}
        <div
          id={`${id}-front`}
          className="face face-front flex flex-col"
          aria-hidden={flipped}
          inert={flipped || undefined}
        >
          {front(controls)}
        </div>

        {/* BACK */}
        <div
          id={`${id}-back`}
          className="face face-back flex flex-col"
          aria-hidden={!flipped}
          inert={!flipped || undefined}
        >
          {back(controls)}
        </div>
      </div>
    </div>
  );
}
