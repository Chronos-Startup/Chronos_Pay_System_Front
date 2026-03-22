import { forwardRef, InputHTMLAttributes } from "react";
import TextUppercase from "../components/TextUppercase";
import { twMerge } from "tailwind-merge";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errors?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", placeholder, errors, required, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <TextUppercase>
          {label} {required && <span className="text-primary">*</span>}
        </TextUppercase>
        <input
          {...rest}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={twMerge("inputs text-white focus:outline-none", errors && "border-red-400")}
        />
        {errors && <span className="text-red-400 text-xs">{errors}</span>}
      </div>
    );
  },
);

InputField.displayName = "InputInputField";

export default InputField;
