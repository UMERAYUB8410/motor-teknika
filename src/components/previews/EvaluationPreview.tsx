/** Evaluation Engine front preview: value widget with $18,750, ↑6.2% and trend line */
export default function EvaluationPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 text-[8px] text-muted relative overflow-hidden">
      {/* Header */}
      <div className="text-[9px] font-medium text-muted mb-1">Estimated Value</div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[22px] font-bold text-text leading-none">$18,750</span>
        <span className="text-green text-[11px] font-semibold">↑ 6.2%</span>
      </div>

      {/* Trend line SVG – colours from CSS vars so no hex in className */}
      <svg viewBox="0 0 120 32" className="w-full mb-2" aria-hidden="true">
        <defs>
          <linearGradient id="evalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--orange)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="0,28 20,22 40,24 60,14 80,16 100,8 120,4 120,32 0,32"
          fill="url(#evalGrad)"
          opacity="0.2"
        />
        <polyline
          points="0,28 20,22 40,24 60,14 80,16 100,8 120,4"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Make / Year / Mileage pills */}
      <div className="flex flex-col gap-[3px] text-[8px] bg-panel2 border border-line rounded p-[6px] leading-[1.9]">
        <span>○ Make</span>
        <span>○ Year</span>
        <span>○ Mileage</span>
      </div>
    </div>
  );
}
