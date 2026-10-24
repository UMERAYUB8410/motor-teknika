"use client";

import { FormEvent, useState } from "react";

const products = [
  "Complete Ecosystem",
  "Evaluation Engine",
  "MaskingTech",
  "API Integration",
  "Not sure yet",
];

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatBookingDate(date: Date) {
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function BookingFlow() {
  const today = new Date();
  const [product, setProduct] = useState(products[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
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

  function chooseDate(day: number) {
    setSelectedDate(new Date(year, month, day));
    setShowForm(false);
    setSubmitted(false);
  }

  function chooseTime(time: string) {
    setSelectedTime(time);
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
      : "there");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr_0.7fr] lg:items-start">
      <div>
        <div className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-orange">GET STARTED</div>
        <h1 className="m-0 mb-4 text-[clamp(32px,4vw,48px)] font-bold leading-none tracking-[-0.025em]">
          See It in Action.<br /><em className="not-italic text-orange">Book a Demo.</em>
        </h1>
        <p className="m-0 max-w-[300px] text-sm leading-relaxed text-muted">
          Choose a time that works for you. Our team will walk you through the platform and show you how it fits your business needs.
        </p>
      </div>

      <section className="rounded-md border border-line bg-panel p-4" aria-labelledby="booking-heading">
        <h2 id="booking-heading" className="m-0 text-sm font-semibold">Book a Demo</h2>
        <p className="mb-4 mt-1 text-[11px] leading-relaxed text-muted">Pick what you want to buy, then a date and time. We will ask for your details next.</p>

        <label className="mb-4 block text-[11px] text-muted" htmlFor="booking-product">
          Booking for
          <select id="booking-product" value={product} onChange={(event) => setProduct(event.target.value)} className="mt-1 block w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange">
            {products.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-[1fr_150px]">
          <div className="rounded border border-line p-2">
            <div className="mb-2 text-center text-xs font-medium">{monthNames[month]} {year}</div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <b key={day} className="py-1 font-medium text-muted">{day}</b>)}
              {calendarDays.map((day, index) => day ? (
                <button key={day} type="button" onClick={() => chooseDate(day)} className={`rounded py-1.5 text-xs transition-colors ${selectedDate?.getDate() === day ? "bg-orange font-bold text-text" : "text-text hover:bg-panel2"}`} aria-label={`Choose ${monthNames[month]} ${day}`}>
                  {day}
                </button>
              ) : <span key={`empty-${index}`} aria-hidden="true" />)}
            </div>
          </div>

          <div className="grid content-start gap-2" aria-label="Available times">
            {timeSlots.map((time) => <button key={time} type="button" onClick={() => chooseTime(time)} className={`rounded border px-2 py-2 text-[11px] transition-colors ${selectedTime === time ? "border-orange text-text shadow-[inset_0_0_0_1px_var(--orange)]" : "border-line bg-bg text-muted hover:border-orange hover:text-text"}`}>{time}</button>)}
            <button type="button" onClick={confirmTime} disabled={!selectedDate} className="mt-1 inline-flex justify-center rounded bg-orange px-2 py-2 text-[11px] font-semibold text-text transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-45">Confirm Time →</button>
          </div>
        </div>

        {selectedDate && !showForm && !submitted && <p className="mt-3 text-[11px] text-muted" role="status">Selected: {formatBookingDate(selectedDate)} at {selectedTime}</p>}

        {showForm && (
          <form onSubmit={submitForm} className="mt-5 border-t border-line pt-4" aria-labelledby="details-heading">
            <h3 id="details-heading" className="m-0 text-base font-semibold">Your details</h3>
            <p className="mb-4 mt-1 text-[11px] text-muted">{product} · {formatBookingDate(selectedDate!)} at {selectedTime}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[11px] text-muted sm:col-span-2">Full name<input name="fullName" required autoComplete="name" className="mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
              <label className="text-[11px] text-muted">Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+971 ..." className="mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
              <label className="text-[11px] text-muted">Work email<input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
              <label className="text-[11px] text-muted">Company<input name="company" autoComplete="organization" className="mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
              <label className="text-[11px] text-muted">Country<input name="country" autoComplete="country-name" className="mt-1 w-full rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
              <label className="text-[11px] text-muted sm:col-span-2">Anything we should know? (optional)<textarea name="notes" rows={2} className="mt-1 w-full resize-y rounded border border-line bg-bg px-2 py-2 text-xs text-text outline-none focus:border-orange" /></label>
            </div>
            <button type="submit" className="mt-4 inline-flex w-full justify-center rounded bg-orange px-4 py-2.5 text-xs font-semibold text-text hover:bg-orange-hover">Confirm booking</button>
          </form>
        )}

        {submitted && <div className="mt-5 border-t border-line pt-4" role="status"><h3 className="m-0 text-lg font-semibold">Booking requested</h3><p className="mb-0 mt-2 text-xs leading-relaxed text-muted">Thank you, {firstName || "there"}. Your demo for {product} is booked for {formatBookingDate(selectedDate!)} at {selectedTime}. Our team will contact you to confirm.</p></div>}
      </section>

      <ul className="grid gap-5 p-0 text-xs text-muted lg:pt-8">
        <li className="flex items-center gap-3"><span className="text-xl text-orange">◷</span>15–30 min demo</li>
        <li className="flex items-center gap-3"><span className="text-xl text-orange">✓</span>No commitment</li>
        <li className="flex items-center gap-3"><span className="text-xl text-orange">?</span>Get your questions answered</li>
      </ul>
    </div>
  );
}
