import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonIconComposition {
  icon: ElementType;
  className?: string;
}

export default function ButtonIcon({ icon: Icon, className }: ButtonIconComposition) {
  return <Icon size={14} className={twMerge("text-black min-w-4", className)} />;
}
