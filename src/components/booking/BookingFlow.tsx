"use client";

import { FormEvent, useState } from "react";
import { format } from "@/data/dictionaries";
import { useDictionary } from "@/data/dictionaries/useDictionary";

const inputClass = "mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange";

export default function BookingFlow({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const t = useDictionary().booking;
  const today = new Date();
  /* Product and time are stored by index so they don't depend on the language */
  const [product, setProduct] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const calendarDays = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1
  );

  function formatBookingDate(date: Date) {
    return format(t.dateFormat, { month: t.months[date.getMonth()], day: date.getDate(), year: date.getFullYear() });
  }

  function chooseDate(day: number) {
    setSelectedDate(new Date(year, month, day));
    setShowForm(false);
    setSubmitted(false);
  }

  function chooseTime(index: number) {
    setSelectedTime(index);
    setShowForm(false);
    setSubmitted(false);
  }

  function confirmTime() {
    if (selectedDate) setShowForm(true);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nameField = event.currentTarget.elements.namedItem("fullName");
    setSubmitted(true);
    setShowForm(false);
    setFirstName(nameField instanceof HTMLInputElement
      ? nameField.value.trim().split(" ")[0]
      : "");
  }

  const time = t.timeSlots[selectedTime];
  const productName = t.products[product];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr_0.7fr] lg:items-start">
      <div>
        <div className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-orange">{t.eyebrow}</div>
        <Heading className="m-0 mb-4 text-[clamp(32px,4vw,48px)] font-bold leading-none tracking-[-0.025em]">
          {t.titleStart}<br /><em className="not-italic text-orange">{t.titleEnd}</em>
        </Heading>
        <p className="m-0 max-w-[300px] text-sm leading-relaxed text-muted">
          {t.intro}
        </p>
      </div>

      <section className="rounded-md border border-line bg-panel p-4" aria-labelledby="booking-heading">
        <h2 id="booking-heading" className="m-0 text-sm font-semibold">{t.panelTitle}</h2>
        <p className="mb-4 mt-1 text-[11px] leading-relaxed text-muted">{t.panelIntro}</p>

        <label className="mb-4 block text-[11px] text-muted" htmlFor="booking-product">
          {t.bookingFor}
          <select id="booking-product" value={product} onChange={(event) => setProduct(Number(event.target.value))} className="mt-1 block w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange">
            {t.products.map((item, index) => <option key={item} value={index}>{item}</option>)}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-[1fr_150px]">
          <div className="rounded border border-line p-2">
            <div className="mb-2 text-center text-xs font-medium">{t.months[month]} {year}</div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
              {t.weekdays.map((day) => <b key={day} className="py-1 font-medium text-muted">{day}</b>)}
              {calendarDays.map((day, index) => day ? (
                <button key={day} type="button" onClick={() => chooseDate(day)} className={`rounded py-1.5 text-xs transition-colors ${selectedDate?.getDate() === day ? "bg-orange font-bold text-text" : "text-text hover:bg-panel2"}`} aria-label={format(t.chooseDay, { month: t.months[month], day })}>
                  {day}
                </button>
              ) : <span key={`empty-${index}`} aria-hidden="true" />)}
            </div>
          </div>

          <div className="grid content-start gap-2" aria-label={t.availableTimes}>
            {t.timeSlots.map((slot, index) => <button key={slot} type="button" onClick={() => chooseTime(index)} className={`rounded border px-2 py-2 text-[11px] transition-colors ${selectedTime === index ? "border-orange text-text shadow-[inset_0_0_0_1px_var(--orange)]" : "border-line bg-bg text-muted hover:border-orange hover:text-text"}`}>{slot}</button>)}
            <button type="button" onClick={confirmTime} disabled={!selectedDate} className="mt-1 inline-flex justify-center rounded bg-orange px-2 py-2 text-[11px] font-semibold text-text transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-45">{t.confirmTime}</button>
          </div>
        </div>

        {selectedDate && !showForm && !submitted && <p className="mt-3 text-[11px] text-muted" role="status">{format(t.selected, { date: formatBookingDate(selectedDate), time })}</p>}

        {showForm && (
          <form onSubmit={submitForm} className="mt-5 border-t border-line pt-4" aria-labelledby="details-heading">
            <h3 id="details-heading" className="m-0 text-base font-semibold">{t.detailsTitle}</h3>
            <p className="mb-4 mt-1 text-[11px] text-muted">{format(t.summary, { product: productName, date: formatBookingDate(selectedDate!), time })}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[11px] text-muted sm:col-span-2">{t.fullName}<input name="fullName" required autoComplete="name" className={inputClass} /></label>
              {/* Phone numbers and emails read left-to-right in every language */}
              <label className="text-[11px] text-muted">{t.phone}<input name="phone" type="tel" required autoComplete="tel" placeholder="+971 ..." dir="ltr" className={inputClass} /></label>
              <label className="text-[11px] text-muted">{t.email}<input name="email" type="email" required autoComplete="email" dir="ltr" className={inputClass} /></label>
              <label className="text-[11px] text-muted">{t.company}<input name="company" autoComplete="organization" className={inputClass} /></label>
              <label className="text-[11px] text-muted">{t.country}<input name="country" autoComplete="country-name" className={inputClass} /></label>
              <label className="text-[11px] text-muted sm:col-span-2">{t.notes}<textarea name="notes" rows={2} className={`${inputClass} resize-y`} /></label>
            </div>
            <button type="submit" className="mt-4 inline-flex w-full justify-center rounded bg-orange px-4 py-2.5 text-xs font-semibold text-text hover:bg-orange-hover">{t.confirmBooking}</button>
          </form>
        )}

        {submitted && <div className="mt-5 border-t border-line pt-4" role="status"><h3 className="m-0 text-lg font-semibold">{t.requestedTitle}</h3><p className="mb-0 mt-2 text-xs leading-relaxed text-muted">{format(t.requestedText, { name: firstName || t.fallbackName, product: productName, date: formatBookingDate(selectedDate!), time })}</p></div>}
      </section>

      <ul className="grid gap-5 p-0 text-xs text-muted lg:pt-8">
        <li className="flex items-center gap-3"><span className="text-xl text-orange">◷</span>{t.perks[0]}</li>
        <li className="flex items-center gap-3"><span className="text-xl text-orange">✓</span>{t.perks[1]}</li>
        <li className="flex items-center gap-3"><span className="text-xl text-orange">?</span>{t.perks[2]}</li>
      </ul>
    </div>
  );
}
