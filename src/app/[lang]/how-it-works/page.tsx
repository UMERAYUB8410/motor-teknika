import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageIntro from "@/components/sections/PageIntro";
import { hasLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/how-it-works">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? getDictionary(lang).meta.howItWorks : {};
}

export default async function HowItWorksPage({ params }: PageProps<"/[lang]/how-it-works">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).pages;

  return (
    <PageIntro
      eyebrow={t.howItWorks.eyebrow}
      title={t.howItWorks.title}
      description={t.comingSoon}
    />
  );
}
