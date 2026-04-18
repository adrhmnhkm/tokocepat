import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type Variant = "primary" | "outline" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass: Record<Variant, string> = {
  primary:
    "bg-green-600 text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:bg-green-700 disabled:opacity-60",
  outline:
    "bg-white text-slate-800 border border-slate-200 hover:border-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100",
};

const sizeClass: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all",
        variantClass[variant],
        sizeClass[size],
        "disabled:cursor-not-allowed",
        className
      )}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
