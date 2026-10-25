/** Simple page heading used on pages that don't have their own content yet */
export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-line py-16 lg:py-24">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-[10px] font-semibold tracking-[0.14em] text-orange mb-3 uppercase">
          {eyebrow}
        </div>
        <h1 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.025em] leading-none m-0 mb-4">
          {title}
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-[520px] m-0">
          {description}
        </p>
      </div>
    </section>
  );
}
