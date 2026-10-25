import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Services from "@/components/sections/Services";
import Pricing  from "@/components/sections/Pricing";
import { hasLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? getDictionary(lang).meta.services : {};
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Services lang={lang} headingLevel="h1" />
      <Pricing lang={lang} />
    </>
  );
}
