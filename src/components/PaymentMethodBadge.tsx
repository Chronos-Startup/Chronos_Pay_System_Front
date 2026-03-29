import { CreditCard, QrCode, ScrollText } from "lucide-react";

interface PaymentMethodBadgeProps {
  payment_method_id: string | undefined;
}

const PAYMENT_METHOD_CONFIG: Record<string, { icon: JSX.Element; label: string }> = {
  pix: { icon: <QrCode size={14} aria-hidden="true" />, label: "PIX" },
  master: { icon: <CreditCard size={14} aria-hidden="true" />, label: "Mastercard" },
  visa: { icon: <CreditCard size={14} aria-hidden="true" />, label: "Visa" },
  elo: { icon: <CreditCard size={14} aria-hidden="true" />, label: "Elo" },
  amex: { icon: <CreditCard size={14} aria-hidden="true" />, label: "Amex" },
  hipercard: { icon: <CreditCard size={14} aria-hidden="true" />, label: "Hipercard" },
  bolbradesco: { icon: <ScrollText size={14} aria-hidden="true" />, label: "Boleto" },
  boletobanrisul: { icon: <ScrollText size={14} aria-hidden="true" />, label: "Boleto" },
};

export const paymentMethodIdIcons = Object.fromEntries(
  Object.entries(PAYMENT_METHOD_CONFIG).map(([key, { icon }]) => [key, icon]),
);

export default function PaymentMethodBadge({ payment_method_id }: PaymentMethodBadgeProps) {
  if (!payment_method_id) return null;

  const config = PAYMENT_METHOD_CONFIG[payment_method_id];

  return (
    <span
      className="px-3 py-1 text-xs flex items-center gap-2"
      aria-label={`Método de pagamento: ${config?.label ?? payment_method_id}`}
    >
      {config?.icon ?? <CreditCard size={14} aria-hidden="true" />}
      <span className="text-white">{config?.label ?? payment_method_id}</span>
    </span>
  );
}
