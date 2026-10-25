type TagVariant = "sold" | "package";

const styles: Record<TagVariant, string> = {
  sold:    "bg-green/15 text-green border border-green",
  package: "bg-orange/15 text-orange border border-orange",
};

export default function Tag({
  variant,
  label,
  className,
}: {
  variant: TagVariant;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-block text-[10px] font-bold rounded-[3px] px-2 py-[3px]",
        styles[variant],
        className ?? "",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
