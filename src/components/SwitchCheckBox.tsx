import { InputHTMLAttributes } from "react";

type SwitchCheckBoxProps = InputHTMLAttributes<HTMLInputElement>;

export function SwitchCheckBox(props: SwitchCheckBoxProps) {
  return (
    <label className="switch w-full">
      <input type="checkbox" {...props} />
      <span className="slider" />
    </label>
  );
}
