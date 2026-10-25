import { permanentRedirect } from "next/navigation";
import { hasLocale, localizePath, defaultLocale } from "@/data/locales";

/* Booking now lives on /contact */
export default async function BookingPage({ params }: PageProps<"/[lang]/booking">) {
  const { lang } = await params;
  permanentRedirect(localizePath("/contact", hasLocale(lang) ? lang : defaultLocale));
}
