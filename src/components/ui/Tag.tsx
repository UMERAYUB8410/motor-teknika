type TagVariant = "sold" | "package";

const styles: Record<TagVariant, string> = {
  sold:    "bg-green/15 text-green border border-green",
  package: "bg-orange/15 text-orange border border-orange",
};

const labels: Record<TagVariant, string> = {
  sold:    "Sold separately",
  package: "Package only",
};

export default function Tag({
  variant,
  className,
}: {
  variant: TagVariant;
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
      {labels[variant]}
    </span>
  );
}
