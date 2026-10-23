/** Reusable image placeholder for card backs */
export default function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-2",
        "border-2 border-dashed border-line-strong rounded",
        "bg-[repeating-linear-gradient(45deg,#10151d_0_10px,#0c1016_10px_20px)]",
        "text-muted text-[11px] h-[220px]",
        className ?? "",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-8 h-8 stroke-line-strong fill-none stroke-[1.5]"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M21 16l-5-5-8 9" />
      </svg>
      <span>Image placeholder</span>
    </div>
  );
}
