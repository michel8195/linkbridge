import Link from "next/link";
import { LinkIcon } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className || ""}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <LinkIcon className="h-4 w-4 text-primary-foreground" />
      </div>
      {showText && (
        <span className="text-lg font-bold">
          Link<span className="text-primary">Bridge</span>
        </span>
      )}
    </Link>
  );
}
