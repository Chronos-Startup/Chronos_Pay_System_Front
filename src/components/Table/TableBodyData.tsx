import { ReactNode, TdHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyDataComposition extends TdHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
  className?: string;
}

export default function TableBodyData({ children, className }: TableBodyDataComposition) {
  return <td className={twMerge("px-8 py-6", className)}>{children}</td>;
}
