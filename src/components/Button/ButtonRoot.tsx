import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonRootComposition extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function ButtonRoot({ className, children, ...rest }: ButtonRootComposition) {
  return (
    <button
      className={twMerge(
        "p-4 flex gap-2 max-md:justify-center cursor-pointer hover:bg-primary-hover transition-all duration-300 items-center text-nowrap max-md:p-2 rounded-2xl bg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
