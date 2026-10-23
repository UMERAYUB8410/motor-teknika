/** Complete Ecosystem front preview: mini laptop + tablet + phone composite */
export default function EcosystemPreview() {
  return (
    <div className="w-full h-full relative flex items-end justify-center pb-1">
      {/* Laptop */}
      <div className="eco-laptop absolute left-1/2 -translate-x-1/2 bottom-3 w-[68%] bg-panel border border-line-strong rounded-[6px] p-[4px]">
        <div className="h-[40px] bg-panel2 rounded-[3px] flex items-center justify-center">
          <div className="w-[80%] space-y-[3px]">
            <div className="h-[3px] bg-line rounded" />
            <div className="h-[3px] bg-line rounded w-3/4" />
            <div className="h-[3px] bg-orange/40 rounded w-1/2" />
          </div>
        </div>
        <div className="h-[4px] mx-[-2%] mt-[2px] bg-gradient-to-b from-muted to-line-strong rounded-b-[6px]" />
      </div>

      {/* Tablet – bottom left */}
      <div className="eco-tablet absolute left-0 bottom-0 w-[38%] bg-panel border-[3px] border-line rounded-[10px] overflow-hidden">
        <div className="h-[30px] bg-panel2 m-1 rounded" />
      </div>

      {/* Phone – bottom right */}
      <div className="eco-phone absolute right-0 bottom-0 w-[19%] bg-panel border-[3px] border-orange rounded-[14px] overflow-hidden">
        <div className="h-[36px] bg-panel2 m-[4px] rounded-[8px]" />
      </div>
    </div>
  );
}
