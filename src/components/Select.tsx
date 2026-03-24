import { ElementType, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import TextUppercase from "./TextUppercase";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: ElementType; // opcional
}

export function Select({
  icon: Icon,
  className,
  required,
  label,
  options,
  placeholder,
  ...rest
}: SelectComponentProps) {
  return (
    <div className={"flex flex-col w-full gap-1.5"}>
      <TextUppercase>
        {label} {required && <span className="text-primary">*</span>}
      </TextUppercase>
      <div className={twMerge("inputs flex items-center gap-2", className)}>
        <select {...rest} className="w-full appearance-none h-full bg-transparent focus:outline-none">
          {placeholder && <option value="">{placeholder}</option>}
          {Object.entries(options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {Icon && <Icon className="text-text-gray shrink-0" size={16} />}
      </div>
    </div>
  );
}
