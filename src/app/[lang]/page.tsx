import { notFound } from "next/navigation";
import Hero     from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Integrations from "@/components/sections/Integrations";
import BookingFlow from "@/components/booking/BookingFlow";
import Pricing from "@/components/sections/Pricing";
import { hasLocale } from "@/data/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <Integrations lang={lang} />
      <Pricing lang={lang} />

      <section id="contact" className="border-b border-line py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <BookingFlow headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
