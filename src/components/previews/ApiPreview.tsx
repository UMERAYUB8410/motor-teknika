/** API Integration front preview: code window + orange API node linked to boxes */
export default function ApiPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-4 p-3 text-[8px] text-muted">
      {/* Left boxes */}
      <div className="flex flex-col gap-2">
        <div className="w-5 h-5 border border-orange rounded-[5px]" />
        <div className="w-5 h-5 border border-line rounded-[5px]" />
      </div>

      {/* Connector lines – use currentColor classes rather than hex attrs */}
      <svg width="24" height="40" viewBox="0 0 24 40" aria-hidden="true" className="shrink-0">
        <line x1="0" y1="10" x2="24" y2="20" stroke="var(--orange)"      strokeWidth="1" />
        <line x1="0" y1="30" x2="24" y2="20" stroke="var(--line-strong)" strokeWidth="1" />
      </svg>

      {/* API node */}
      <div className="w-14 h-9 border border-orange rounded flex items-center justify-center font-bold text-[17px] text-text shrink-0">
        API
      </div>

      {/* Connector lines right */}
      <svg width="24" height="40" viewBox="0 0 24 40" aria-hidden="true" className="shrink-0">
        <line x1="0" y1="20" x2="24" y2="10" stroke="var(--orange)"      strokeWidth="1" />
        <line x1="0" y1="20" x2="24" y2="30" stroke="var(--line-strong)" strokeWidth="1" />
      </svg>

      {/* Right boxes */}
      <div className="flex flex-col gap-2">
        <div className="w-5 h-5 border border-orange rounded-[5px]" />
        <div className="w-5 h-5 border border-line rounded-[5px]" />
      </div>
    </div>
  );
}
