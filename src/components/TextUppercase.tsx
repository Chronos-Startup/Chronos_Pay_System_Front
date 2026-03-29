import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextUppercaseProps extends ComponentProps<"p"> {
  children: ReactNode;
}

export default function TextUppercase({ children, className, ...props }: TextUppercaseProps) {
  return (
    <p
      className={twMerge("text-xs text-nowrap font-bold text-slate-400 uppercase tracking-[0.2em]", className)}
      {...props}
    >
      {children}
    </p>
  );
}
