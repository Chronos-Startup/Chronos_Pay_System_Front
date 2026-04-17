import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyComposition {
  children: ReactNode;
  className?: string;
}

export default function TableBody({ children, className }: TableBodyComposition) {
  return (
    <tbody className={twMerge("glass-card divide-y divide-white/5 text-xs", className)}>{children}</tbody>
  );
}
