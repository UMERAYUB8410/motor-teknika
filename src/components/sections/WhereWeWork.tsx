export default function WhereWeWork() {
  return (
    <div className="relative z-10 border-t border-line bg-[rgba(10,12,16,0.72)] backdrop-blur-[6px]">
      <div className="max-w-[1180px] mx-auto px-6 py-4 flex flex-wrap items-center gap-[30px]">
        <span className="text-[11px] font-bold tracking-[0.14em] text-orange whitespace-nowrap">
          WHERE WE WORK
        </span>
        <ul className="flex flex-wrap gap-[34px] list-none m-0 p-0">
          <li className="flex flex-col border-l-2 border-orange pl-[10px] text-[12px] text-muted">
            <b className="text-text text-[14px]">Worldwide</b>
            Dealers and trade networks around the globe
          </li>
        </ul>
      </div>
    </div>
  );
}
