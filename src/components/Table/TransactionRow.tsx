import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { Table } from ".";
import { formatDate } from "../../utils/DateUtils";
import { getColorFromName, getInitialChar, truncateString } from "../../utils/StringUtils";
import PaymentMethodBadge from "../PaymentMethodBadge";
import StatusBadge from "../statusBadge";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import TransactionModal from "../TransactionModal";

interface TransactionRowProps {
  transaction: PaymentResponse;
}
export default function TransactionRow({ transaction }: TransactionRowProps) {
  const { date, time } = formatDate(transaction?.date_created);
  const [show, setShow] = useState<boolean>(false);
  const payerName =
    `${transaction.payer?.first_name || ""} ${transaction.payer?.last_name || ""}`.trim() ||
    transaction.card?.cardholder?.name;
  const initials = getInitialChar(payerName)?.toUpperCase();

  return (
    <>
      <Table.Body.Row onClick={() => setShow(!show)}>
        <Table.Body.Data>
          <div className="font-mono text-xs text-white group-hover:text-primary transition-colors">
            {transaction?.id}
          </div>
          <div className="text-[10px] text-text-gray italic">
            API Ref: {truncateString(transaction.external_reference)}
          </div>
        </Table.Body.Data>
        <Table.Body.Data>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ring-4 ring-white/5 ${initials ? getColorFromName(payerName) : "bg-red-800"} text-white text-xs font-semibold`}
            >
              {initials || "?"}
            </div>
            <div>
              <div className="font-medium text-white">{payerName || "Usuário Desconhecido"}</div>
              <div className="text-xs text-gray-400">{transaction?.payer?.email || "Email Desconhecido"}</div>
            </div>
          </div>
        </Table.Body.Data>
        <Table.Body.Data>
          <span className="text-primary font-medium uppercase">
            <PaymentMethodBadge payment_method_id={transaction?.payment_method_id} />
          </span>
        </Table.Body.Data>
        <Table.Body.Data>
          <span className={transaction.status !== "approved" ? "text-gray-500" : "text-white"}>
            R$ {transaction.transaction_amount?.toFixed(2)}
          </span>
        </Table.Body.Data>
        <Table.Body.Data>
          <StatusBadge status={transaction?.status} />
        </Table.Body.Data>
        <Table.Body.Data className="px-8 py-6 text-right">
          <div>{date}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </Table.Body.Data>
      </Table.Body.Row>
      <AnimatePresence>{show && <TransactionModal transaction={transaction} setShow={setShow} />}</AnimatePresence>
    </>
  );
}
