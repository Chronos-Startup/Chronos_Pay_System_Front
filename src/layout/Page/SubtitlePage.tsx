import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SubtitlePageProps {
  children: ReactNode;
  className?: string;
}

export function SubtitlePage({ children, className }: SubtitlePageProps) {
  return (
    <p className={twMerge("subtitles leading-relaxed text-sm text-text-gray  text-wrap", className)}>{children}</p>
  );
}
