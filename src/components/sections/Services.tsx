import { services } from "@/data/services";
import ServiceCard   from "@/components/ui/ServiceCard";

/* Split featured (ecosystem) away from the 4-column cards */
const gridCards     = services.filter((s) => !s.featured);
const featuredCard  = services.find((s) => s.featured);

export default function Services() {
  return (
    <section id="services" className="border-b border-line py-9">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Eyebrow */}
        <div className="text-[10px] font-semibold tracking-[0.14em] text-orange mb-2">
          OUR SERVICES
        </div>

        {/* Heading */}
        <h2 className="text-[clamp(26px,3.2vw,30px)] font-bold tracking-[-0.015em] leading-[1.1] m-0 mb-[6px]">
          Powerful Tools for Every Step
        </h2>

        {/* Subtitle */}
        <p className="text-muted text-[13px] m-0 mb-6">
          Get the tools you need — individually or as a complete ecosystem.
        </p>

        {/* 4-card grid (Evaluation, Masking, Auction, API) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          {gridCards.map((service) => (
            <div key={service.id} className="flex flex-col h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Complete Ecosystem – full width below the grid */}
        {featuredCard && (
          <div className="mt-4">
            <ServiceCard service={featuredCard} />
          </div>
        )}
      </div>
    </section>
  );
}
