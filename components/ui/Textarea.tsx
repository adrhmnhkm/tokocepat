import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  error?: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  label,
  error,
  hint,
  id,
  name,
  className,
  required,
  ...props
}: Props) {
  const textareaId = id ?? name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        required={required}
        {...props}
        className={cn(
          "w-full px-4 py-3 text-[16px] leading-snug rounded-xl border bg-white resize-none transition-colors outline-none",
          "focus:ring-2 focus:ring-green-500 focus:border-transparent",
          "placeholder:text-slate-400",
          error
            ? "border-red-300 focus:ring-red-400"
            : "border-slate-200 hover:border-slate-300",
          className
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
