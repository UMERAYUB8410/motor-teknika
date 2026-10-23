/** MaskingTech front preview: car SVG with blurred plate + before/after labels beneath */
export default function MaskingPreview() {
  /* Shared car SVG path data */
  const carBody = (
    <>
      <path
        d="M14 118l10-26q6-14 22-18l50-12 34-30q8-8 22-8h120q16 0 28 10l32 30 38 8q16 4 18 22l4 24H14z"
        fill="#1a1f29"
      />
      <path
        d="M118 52l24-22q6-6 16-6h110q10 0 18 7l26 22z"
        fill="#2a3342"
      />
      <circle cx="96"  cy="130" r="26" fill="#07090c" />
      <circle cx="96"  cy="130" r="13" fill="#2b323e" />
      <circle cx="308" cy="130" r="26" fill="#07090c" />
      <circle cx="308" cy="130" r="13" fill="#2b323e" />
    </>
  );

  return (
    <div className="w-full h-full flex items-center gap-3 p-3">
      {/* Before */}
      <div className="flex-1 flex flex-col h-full">
        {/* Car image area */}
        <div className="flex-1 bg-panel2 rounded overflow-hidden relative">
          <svg viewBox="0 0 400 170" className="w-full h-full" aria-hidden="true">
            {carBody}
            {/* Clear plate */}
            <rect x="183" y="108" width="36" height="14" rx="2" fill="#c5cad3" />
            <text x="201" y="119" textAnchor="middle" fontSize="7" fill="#1b2333" fontWeight="bold">
              AB 1234
            </text>
          </svg>
        </div>
        {/* Label below the image */}
        <p className="text-[9px] text-muted text-center mt-1 mb-0">Before</p>
      </div>

      {/* Arrow separator */}
      <span className="text-muted text-[14px] shrink-0" aria-hidden="true">→</span>

      {/* After */}
      <div className="flex-1 flex flex-col h-full">
        {/* Car image area */}
        <div className="flex-1 bg-panel2 rounded overflow-hidden relative">
          <svg viewBox="0 0 400 170" className="w-full h-full" aria-hidden="true">
            {carBody}
            {/* Blurred/blocked plate */}
            <rect x="183" y="108" width="36" height="14" rx="2" fill="#8a8a8a" opacity="0.8" />
            <rect x="183" y="108" width="36" height="14" rx="2" fill="url(#blurGrad)" />
          </svg>
          <defs>
            <linearGradient id="blurGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#9a9ea6" stopOpacity="0.9" />
              <stop offset="50%"  stopColor="#c5cad3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9a9ea6" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </div>
        {/* Label below the image */}
        <p className="text-[9px] text-muted text-center mt-1 mb-0">After</p>
      </div>
    </div>
  );
}
