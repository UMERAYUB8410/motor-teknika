/** Auction Platform front preview: current bid + bid list */
export default function AuctionPreview() {
  const bids = ["$24,300", "$24,200", "$23,900"];
  return (
    <div className="w-full h-full grid grid-cols-[1.3fr_1fr] gap-2 p-3 text-[8px] text-muted">
      {/* Left – current bid */}
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-muted mb-1">Current Bid</div>
          <div className="text-[18px] font-bold text-text leading-none">$24,500</div>
        </div>
        {/* decorative "Bid Now" — not interactive in a preview */}
        <div className="w-full py-[4px] rounded bg-orange text-text text-[8px] font-semibold mt-2 text-center">
          Bid Now
        </div>
      </div>

      {/* Right – bid list */}
      <div className="flex flex-col gap-[4px]">
        {bids.map((bid) => (
          <div
            key={bid}
            className="flex items-center gap-[5px] bg-panel2 rounded px-[6px] py-[4px] text-text"
          >
            <span className="w-[10px] h-[10px] rounded-full bg-orange/40 shrink-0" />
            {bid}
          </div>
        ))}
      </div>
    </div>
  );
}
