import { ArrowLeft, ArrowRight, ArrowUpDown, LoaderCircleIcon, Search } from "lucide-react";
import { Button } from "../components/Button";
import { Table } from "../components/Table";

import { UserAmplify } from "./MercadoPagoConnect";
import { useTransactions } from "../hooks/useTransactions";
import { useCallback, useState } from "react";
import { TransactionFilters } from "../types/transactionFilters";
import SearchTransactions from "../components/TransactionsPage/SearchTransactions";
import Filters from "../components/TransactionsPage/Filters";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
export default function Transactions({ userCognito }: UserAmplify) {
  const [page, setPage] = useState(1);
  const [filterForm, setFilterForm] = useState<TransactionFilters>({});
  const { data, isLoading } = useTransactions({
    userId: userCognito?.userId,
    page,
    pageSize: 10,
    filters: filterForm,
  });

  const transactions = data?.Items ?? [];
  const hasNextPage = !!data?.LastEvaluatedKey;
  const hasPreviousPage = page > 1;
  const isEmpty = transactions.length === 0 && !isLoading;

  const nextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };
  const previousPage = () => {
    if (hasPreviousPage) setPage((prev) => prev - 1);
  };

  const handleFilter = useCallback((field: keyof TransactionFilters, value: string) => {
    setFilterForm((prev) => ({ ...prev, [field]: value || undefined }));
    setPage(1);
  }, []);

  const handleRefetch = useCallback(() => {
    setPage(1);
  }, []);

  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-5 overflow-x-hidden">
      <div className="flex justify-between md:max-h-14 max-md:flex-col max-md:gap-5">
        <div>
          <h1 className="titles text-3xl">Transações</h1>
          <p className="subtitles text-wrap">Visualize e gerencie todas as transações da sua conta.</p>
        </div>
        {/* <div className="flex gap-3">
          <Button.Root className="text-charcoal">
            <Button.Icon className="text-charcoal" icon={Download} />
            Exportar CSV
          </Button.Root>
        </div> */}
      </div>

      <div className="bg-midnight-light px-4 py-2 space-y-5 rounded-xl">
        <SearchTransactions filterForm={filterForm} handleFilter={handleFilter} />

        <Filters filterForm={filterForm} setFilterForm={setFilterForm} />
        <Button.Root onClick={handleRefetch} className="w-full lg:hidden text-black">
          <Button.Icon icon={Search} />
          Buscar
        </Button.Root>
      </div>

      <div className="max-md:overflow-x-scroll overflow-y-hidden border rounded-xl border-[#1E293B] w-full">
        {!isEmpty && (
          <Table.Root>
            <Table.Head.Root>
              <Table.Head.Data>ID da Transação</Table.Head.Data>
              <Table.Head.Data>Cliente</Table.Head.Data>
              <Table.Head.Data>Método</Table.Head.Data>
              <Table.Head.Data>Valor</Table.Head.Data>
              <Table.Head.Data>Status</Table.Head.Data>
              <Table.Head.Data>Data</Table.Head.Data>
              <Table.Head.Data></Table.Head.Data>
            </Table.Head.Root>
            <Table.Body.Root>
              {transactions.map((transaction: PaymentResponse) => (
                <Table.Body.TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </Table.Body.Root>
          </Table.Root>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <LoaderCircleIcon className="text-text-gray animate-spin w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Carregando...</p>
            </div>
          </div>
        )}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowUpDown className="text-text-gray w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Nenhuma transação encontrada</p>
              <p className="text-text-gray text-sm mt-1">
                {Object.values(filterForm).some(Boolean)
                  ? "Nenhuma transação corresponde aos filtros aplicados."
                  : "Suas transações aparecerão aqui assim que forem realizadas."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-5 items-center max-md:justify-between">
        <p>
          {transactions.length} Item | Página {page}
        </p>
        <div className="flex gap-2">
          <Button.Root className="p-2" disabled={!hasPreviousPage} onClick={previousPage} aria-label="Página anterior">
            <Button.Icon icon={ArrowLeft} aria-hidden="true" />
          </Button.Root>

          {!isEmpty && (
            <Button.Root className="p-2" disabled={!hasNextPage} onClick={nextPage} aria-label="Próxima página">
              <Button.Icon icon={ArrowRight} aria-hidden="true" />
            </Button.Root>
          )}
        </div>
      </div>
    </div>
  );
}
