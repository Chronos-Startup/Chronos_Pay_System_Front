import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  placeholder?: string;
  className?: string;
}

export function Select({ className, options, placeholder, ...rest }: SelectComponentProps) {
  return (
    <select {...rest} className={twMerge("inputs bg-midnight-dark", className)}>
      {placeholder && <option value="">{placeholder}</option>}
      {Object.entries(options).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}