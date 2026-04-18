import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TitlePageProps {
  children: ReactNode;
  className?: string;
}

export function TitlePage({ children, className }: TitlePageProps) {
  return <h1 className={twMerge("titles text-3xl", className)}>{children}</h1>;
}
