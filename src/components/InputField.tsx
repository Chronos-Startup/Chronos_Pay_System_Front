import { forwardRef, InputHTMLAttributes } from "react";
import TextUppercase from "../components/TextUppercase";
import { twMerge } from "tailwind-merge";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", placeholder, className, error, required, ...rest }, ref) => {
    return (
      <div className={twMerge("flex flex-col w-full gap-1.5", className)}>
        <TextUppercase>
          {label} {required && <span className="text-primary">*</span>}
        </TextUppercase>
        <input
          {...rest}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={twMerge("inputs text-white focus:outline-none", error && "border-red-400")}
        />
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  },
);

InputField.displayName = "InputInputField";

export default InputField;
