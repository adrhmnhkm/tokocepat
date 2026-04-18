import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

export default function Spinner({ size = "md", className }: Props) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-current border-t-transparent",
        sizeClass[size],
        className
      )}
    />
  );
}
