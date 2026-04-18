import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardPageProps {
  children: ReactNode;
  className?: string;
}

export function CardPage({ children, className }: CardPageProps) {
  return (
    <div
      className={twMerge(
        "glass-card p-5 max-md:flex-col items-center gap-5 flex rounded-[2.5rem] border border-white/5 text-white/80 text-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
