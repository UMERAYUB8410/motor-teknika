import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageIntro from "@/components/sections/PageIntro";
import { hasLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? getDictionary(lang).meta.about : {};
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).pages;

  return (
    <PageIntro
      eyebrow={t.about.eyebrow}
      title={t.about.title}
      description={t.comingSoon}
    />
  );
}
