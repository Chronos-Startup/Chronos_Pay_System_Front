import { BadgeDollarSign, User, X } from "lucide-react";
import PaymentMethodBadge from "./PaymentMethodBadge";
import TransactionModalField from "./TransactionModalField";
import { formatDocument } from "../utils/StringUtils";
import { motion } from "motion/react";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import TextUppercase from "./TextUppercase";
import StatusBadge from "./statusBadge";
import { errorMap, stylesStatus } from "../constants/constants";
import { Button } from "./Button";
import { formatDate } from "../utils/DateUtils";

interface TransactionModalProps { transaction: PaymentResponse, setShow: (value: boolean) => void }
export default function TransactionModal({ transaction, setShow }: TransactionModalProps) {
    const { date, time } = formatDate(transaction?.date_created);
    const status = transaction.status as keyof typeof stylesStatus
    const status_detail = transaction.status_detail as keyof typeof errorMap
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={() => setShow(false)} className="fixed inset-0 p-6 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs ">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass-card rounded-lg  overflow-y-auto max-md:h-full  shadow-xl p-6 w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="py-6 flex gap-3 items-center">
                    <StatusBadge status={transaction.status} />
                    <TextUppercase>
                        ID: {transaction.id}
                    </TextUppercase>
                </header>

                <main>
                    <div className="w-full border-b py-6 border-text-gray flex flex-col gap-2 items-center justify-center">
                        <TextUppercase className="text-md">VALOR DA TRANSAÇÃO</TextUppercase>
                        <span className="text-4xl font-extrabold">R$ {transaction.transaction_amount}</span>
                        <p className="text-text-gray text-md">{transaction.description}</p>
                        <p className={`${stylesStatus[status]} px-3 py-1 rounded-full text-wrap border text-md`}>
                            {errorMap[status_detail]}
                        </p>
                    </div>
                    <div className="flex max-md:flex-col">
                        <div className="py-4 flex flex-col gap-4 w-full md:max-w-1/2">
                            <TextUppercase className="text-primary flex gap-2 items-center ">
                                <User /> DADOS DO PAGADOR
                            </TextUppercase>
                            <TransactionModalField label="nome completo" value={`${transaction.payer?.first_name}  ${transaction.payer?.last_name}`} />
                            <TransactionModalField label="email" value={transaction.payer?.email} />
                            {transaction.payer?.identification?.number && (
                                <TransactionModalField label={transaction.payer.identification.type} value={formatDocument(transaction.payer.identification.number)} />
                            )}
                            {transaction.payer?.address &&
                                (<TransactionModalField label="endereço" value={`${transaction.payer?.address?.city} - ${transaction.payer?.address.federal_unit}, ${transaction.payer?.address.neighborhood}, ${transaction.payer?.address?.street_name}, ${transaction.payer?.address?.street_number}, ${transaction.payer?.address?.zip_code}`} />)
                            }
                        </div>
                        <div className="py-4 flex flex-col gap-4 w-full md:max-w-1/2">
                            <TextUppercase className="text-primary flex gap-2 items-center ">
                                <BadgeDollarSign /> Método de Pagamento
                            </TextUppercase>
                            <div className="p-6 rounded-2xl flex flex-wrap items-center uppercase bg-midnight-light border border-text-gray text-green-400">
                                <PaymentMethodBadge payment_method_id={transaction.payment_method_id} />
                                {transaction.card?.last_four_digits && (<p className="text-white">{transaction.card.last_four_digits}</p>)}
                            </div>
                            {transaction.installments && (
                                <TransactionModalField label="Parcelas" value={`${transaction.installments}x R$${transaction.transaction_details?.installment_amount || transaction.transaction_amount}`} />
                            )}
                            {transaction.statement_descriptor && (
                                <TransactionModalField label="No extrato" value={transaction.statement_descriptor} />
                            )}
                        </div>
                    </div>
                    <div className="py-4 flex flex-col gap-4 w-full">
                        <TextUppercase className="text-primary flex gap-2 items-center ">
                            <BadgeDollarSign /> Dados Técnicos
                        </TextUppercase>
                        <TransactionModalField label="Referencia Externa" value={transaction.external_reference} />
                        <TransactionModalField label="Data de criação" value={`${date} as ${time}`} />
                    </div>
                </main>
                <Button.Root onClick={() => setShow(false)} className="w-full flex justify-center text-midnight-dark">
                    <Button.Icon icon={X} />
                    <p className="font-bold text-md">Fechar Modal</p>
                </Button.Root>
            </motion.div>
        </motion.div>
    )
}