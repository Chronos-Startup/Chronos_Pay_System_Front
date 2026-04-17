import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadComposition {
  children: ReactNode;
  className?: string;
}

export default function TableHead({ children, className }: TableHeadComposition) {
  return (
    <thead>
      <tr className={twMerge("border-b border-charcoal bg-gray-800", className)}>{children}</tr>
    </thead>
  );
}
