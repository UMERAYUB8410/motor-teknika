import Image from "next/image";

/** Complete Ecosystem front preview: laptop + tablet + phone composite (same renders as the hero) */
export default function EcosystemPreview() {
  return (
    <div className="relative w-[92%] max-w-[440px] aspect-[16/11]" aria-hidden="true">
      {/* Laptop – large central display */}
      <div className="absolute left-[7%] top-0 w-[86%]">
        <Image src="/images/laptop-transparent.png" alt="" width={1024} height={687} sizes="380px" className="block h-auto w-full" />
      </div>

      {/* Tablet – overlapping lower left */}
      <div className="absolute bottom-[2%] left-0 w-[48%]">
        <Image src="/images/ipad-transparent.png" alt="" width={1024} height={687} sizes="210px" className="block h-auto w-full" />
      </div>

      {/* Phone – overlapping lower right */}
      <div className="absolute bottom-0 right-0 w-[22%]">
        <Image src="/images/mobile-transparent.png" alt="" width={687} height={1024} sizes="100px" className="block h-auto w-full" />
      </div>
    </div>
  );
}
