import { Copy, CheckCircle } from "lucide-react";
import { useClipboard } from "../hooks/useClipboard";
import { ReactNode } from "react";

interface CopyButtonProps {
  value?: string | number;
  className?: string;
  children?: ReactNode;
}

export default function CopyButton({ value, className, children }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  if (!value) {
    return null;
  }

  return (
    <button onClick={() => copy(value)} className={`cursor-pointer transition flex items-center gap-3 ${className}`}>
      {children}
      {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
    </button>
  );
}
