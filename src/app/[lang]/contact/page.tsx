import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";
import { hasLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? getDictionary(lang).meta.contact : {};
}

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-58px)] border-b border-line py-12 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <BookingFlow />
      </div>
    </section>
  );
}
