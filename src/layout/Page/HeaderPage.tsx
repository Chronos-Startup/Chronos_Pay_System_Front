import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderPageProps {
  children: ReactNode;
  className?: string;
}
export function HeaderPage({ children, className }: HeaderPageProps) {
  return (
    <header className={twMerge("flex justify-between xl:items-center max-md:flex-col max-md:gap-5", className)}>
      <div className="max-w-2xl space-y-2">{children}</div>
    </header>
  );
}
