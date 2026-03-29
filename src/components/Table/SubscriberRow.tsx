import { Table } from ".";
import { formatDate } from "../../utils/DateUtils";
import { getInitialChar, truncateString } from "../../utils/StringUtils";
import StatusBadge from "../statusBadge";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

type Subscriber = {
  id: string;
  name: string;
  payer_email: string;
  identificationType: string;
  identificationNumber: string;
  status: string;
  date_created: string;
  next_payment_date: string;
  payment_method_id: string;
  reason: string;
  preapproval_plan_id: string;
  external_reference?: string;
  auto_recurring: {
    transaction_amount: number;
    currency_id: string;
    frequency: number;
    frequency_type: string;
  };
};

interface SubscriberRowProps {
  subscriber: Subscriber;
}

export default function SubscriberRow({ subscriber }: SubscriberRowProps) {
  const { date, time } = formatDate(subscriber?.date_created);
  const { date: nextPaymentDate, time: nextPaymentTime } = formatDate(subscriber?.next_payment_date);
  const [show, setShow] = useState<boolean>(false);

  const nameParts = subscriber.name?.split(" ") ?? [];
  const initials = `${getInitialChar(nameParts[0])}${getInitialChar(nameParts[1])}`.toUpperCase() || "?";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: subscriber.auto_recurring?.currency_id ?? "BRL",
  }).format(subscriber.auto_recurring?.transaction_amount ?? 0);

  const frequency = subscriber.auto_recurring
    ? `${subscriber.auto_recurring.frequency} ${
        subscriber.auto_recurring.frequency_type === "months" ? "mês(es)" : "dia(s)"
      }`
    : "—";

  return (
    <>
      <Table.Body.Row onClick={() => setShow(!show)}>
        {/* ID */}
        <Table.Body.Data>
          <div className="font-medium text-white">{subscriber?.id}</div>
          <div className="text-xs text-gray-400">Ref: {truncateString(subscriber.external_reference)}</div>
        </Table.Body.Data>

        {/* Assinante */}
        <Table.Body.Data>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-xs font-semibold">
              {initials}
            </div>
            <div>
              <div className="font-medium text-white">{subscriber.name || "—"}</div>
              <div className="text-xs text-gray-400">{subscriber.payer_email || "Sem Email"}</div>
            </div>
          </div>
        </Table.Body.Data>

        {/* Documento */}
        <Table.Body.Data>
          <div className="font-medium text-white">{subscriber.identificationType || "—"}</div>
          <div className="text-xs text-gray-400">{subscriber.identificationNumber || "—"}</div>
        </Table.Body.Data>

        {/* Plano */}
        <Table.Body.Data>
          <div className="font-medium text-white">{subscriber.reason || "—"}</div>
          <div className="text-xs text-gray-400">A cada {frequency}</div>
        </Table.Body.Data>

        {/* Valor */}
        <Table.Body.Data>
          <span className="text-green-400 font-medium">{amount}</span>
        </Table.Body.Data>

        {/* Status */}
        <Table.Body.Data>
          <StatusBadge status={subscriber?.status} />
        </Table.Body.Data>

        {/* Data */}
        <Table.Body.Data>
          <div>{date}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </Table.Body.Data>

        <Table.Body.Data>
          <div>{nextPaymentDate}</div>
          <div className="text-xs text-gray-400">{nextPaymentTime}</div>
        </Table.Body.Data>

        {/* Ações */}
        <Table.Body.Data className="text-right">
          <button>{subscriber.auto_recurring.frequency} </button>
        </Table.Body.Data>
      </Table.Body.Row>

      <AnimatePresence>
        {show && (
          // substituir por um SubscriberModal quando criar
          <div />
        )}
      </AnimatePresence>
    </>
  );
}
