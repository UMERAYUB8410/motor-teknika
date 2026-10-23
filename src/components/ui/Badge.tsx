type BadgeVariant = "new" | "all-in-one";

export default function Badge({
  label,
  variant = "new",
}: {
  label?: string;
  variant?: BadgeVariant;
}) {
  return (
    <span className="text-[8px] font-bold bg-[rgba(255,106,19,0.18)] text-orange border border-orange rounded-[3px] px-[6px] py-[1px] leading-none">
      {label ?? (variant === "all-in-one" ? "ALL-IN-ONE" : "NEW")}
    </span>
  );
}
