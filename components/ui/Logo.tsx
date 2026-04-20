import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
};

// Intrinsic size dari logo setelah crop: 881×185px (rasio ~4.76:1)
const sizeMap = {
  sm: { width: 143, height: 30, className: "h-[30px] w-auto" },
  md: { width: 190, height: 40, className: "h-10 w-auto" },
  lg: { width: 238, height: 50, className: "h-[50px] w-auto" },
};

export default function Logo({ href = "/", size = "md", className, asLink = true }: Props) {
  const { width, height, className: sizeClass } = sizeMap[size];

  const img = (
    <Image
      src="/logo.png"
      alt="KirimLink.id"
      width={width}
      height={height}
      priority
      unoptimized
      className={cn("object-contain", sizeClass, className)}
    />
  );

  if (!asLink) return img;

  return (
    <Link href={href} className="inline-flex items-center">
      {img}
    </Link>
  );
}
