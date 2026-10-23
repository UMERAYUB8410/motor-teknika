"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface FlipCardProps {
  front: (controls: FlipControls) => ReactNode;
  back:  (controls: FlipControls) => ReactNode;
  className?: string;
}

export interface FlipControls {
  flip:      () => void;
  unflip:    () => void;
  toggle:    () => void;
  isFlipped: boolean;
}

export default function FlipCard({ front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const flip   = useCallback(() => setFlipped(true),  []);
  const unflip = useCallback(() => setFlipped(false), []);
  const toggle = useCallback(() => setFlipped((v) => !v), []);

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

  /* Touch: tap outside buttons toggles */
  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "BUTTON" && !target.closest("button")) {
      toggle();
    }
  }, [toggle]);

  const controls: FlipControls = { flip, unflip, toggle, isFlipped: flipped };

  return (
    <div
      ref={cardRef}
      className={[
        "is-flip-card relative",
        flipped ? "is-flipped" : "",
        className ?? "",
      ].join(" ")}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
    >
      {/* perspective wrapper – 3D transform lives in .flipper CSS class */}
      <div className="flipper w-full h-full" style={{ perspective: "1400px" }}>
        {/* FRONT */}
        <div
          className="face face-front flex flex-col"
          aria-hidden={flipped}
          inert={flipped || undefined}
        >
          {front(controls)}
        </div>

        {/* BACK */}
        <div
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
