import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadDataComposition {
  children?: ReactNode;
  className?: string;
}

export default function TableHeadData({ children, className }: TableHeadDataComposition) {
  return (
    <th className={twMerge("px-8 py-5 text-[10px] text-left font-bold text-text-gray uppercase tracking-[0.2em]", className)}>
      {children}
    </th>
  );
}
