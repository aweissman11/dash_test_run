export type PillProps = {
  className?: string;
  variant: "primary" | "badge";
  children: string;
  selected?: boolean;
};

export function Pill({
  className = "",
  variant = "primary",
  selected = false,
  children,
}: PillProps) {
  const background = selected
    ? variant === "primary"
      ? "bg-primary"
      : "bg-black"
    : variant === "primary"
    ? "bg-white outline outline-1 outline-black hover:bg-background"
    : "bg-black";

  const textColor =
    variant === "primary"
      ? selected
        ? "text-white"
        : "text-black"
      : "text-white font-bold cursor-default";

  return (
    <span
      className={`flex h-8 max-w-max cursor-pointer items-center justify-center rounded-full px-2 py-2 text-sm font-normal transition-colors hover:opacity-90 ${background} ${textColor} ${className}`}
    >
      {children}
    </span>
  );
}
