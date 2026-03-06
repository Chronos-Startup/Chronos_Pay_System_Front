import { CreditCard, QrCode, ScrollText } from "lucide-react";

interface PaymentMethodBadgeProps {
  payment_method_id: string | undefined;
}

export default function PaymentMethodBadge({
  payment_method_id,
}: PaymentMethodBadgeProps) {

  if (!payment_method_id) return null;
  const icons: Record<string, JSX.Element> = {
    pix: <QrCode />,
    master: <CreditCard />,
    boleto: <ScrollText />
  };

  return (
    <span className={`px-3 py-1 text-xs flex items-center gap-2`}>
      {icons[payment_method_id]}
      <span className="text-white">
        {payment_method_id}
      </span>
    </span>
  );
}
