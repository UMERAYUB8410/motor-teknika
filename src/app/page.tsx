import Header   from "@/components/layout/Header";
import Hero     from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Integrations from "@/components/sections/Integrations";
import BookingFlow from "@/components/booking/BookingFlow";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Integrations />
        <Pricing />

        <section id="contact" className="border-b border-line py-16">
          <div className="mx-auto max-w-[1180px] px-6">
            <BookingFlow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
