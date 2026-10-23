import Header   from "@/components/layout/Header";
import Hero     from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />

        {/* Placeholder anchors for scroll-spy – will be built later */}
        <section id="how"     className="min-h-[200px] border-b border-line" />
        <section id="about"   className="min-h-[200px] border-b border-line" />
        <section id="contact" className="min-h-[200px]" />
      </main>
    </>
  );
}
