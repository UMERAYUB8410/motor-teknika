import Header from "@/components/layout/Header";
import BookingFlow from "@/components/booking/BookingFlow";

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-58px)] border-b border-line py-12 lg:py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <BookingFlow />
        </div>
      </main>
    </>
  );
}
