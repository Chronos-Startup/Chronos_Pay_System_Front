import { ElementType, SelectHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import TextUppercase from "./TextUppercase";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: ElementType;
}

export const Select = forwardRef<HTMLSelectElement, SelectComponentProps>(
  ({ icon: Icon, className, required, label, options, placeholder, ...rest }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1.5">
        <TextUppercase>
          {label} {required && <span className="text-primary">*</span>}
        </TextUppercase>
        <div
          className={twMerge(
            "inputs",
            className,
          )}
        >
          <select
            ref={ref}
            {...rest}
            className="w-full cursor-pointer  appearance-none h-full bg-transparent focus:outline-none"
          >
            {placeholder && <option value="">{placeholder}</option>}
            {Object.entries(options).map(([value, label]) => (
              <option className="text-white bg-gray-700" key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {Icon && <Icon className="text-text-gray" size={16} />}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";
