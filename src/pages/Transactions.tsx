import { ArrowLeft, ArrowRight, ArrowUpDown, Download, LoaderCircleIcon, Search } from "lucide-react";
import { Button } from "../components/Button";
import { Table } from "../components/Table";

import { UserAmplify } from "./MercadoPagoConnect";
import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
import { TransactionFilters } from "../types/transactionFilters";
import { Select } from "../components/Select";
import { labels, payment_methods_id } from "../constants/constants";
import TextUppercase from "../components/TextUppercase";
export default function Transactions({ userCognito }: UserAmplify) {

  const [page, setPage] = useState(1);
  const [filterForm, setFilterForm] = useState<TransactionFilters>({})
  const { data, isLoading, refetch } = useTransactions({
    userId: userCognito?.userId,
    page,
    pageSize: 10,
    filters: filterForm,
  });

  const transactions = data?.Items ?? [];
  const hasNextPage = !!data?.LastEvaluatedKey;
  const hasPreviousPage = page > 1;
  const isEmpty = transactions.length === 0 && !isLoading

  const nextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };
  const previousPage = () => {
    if (hasPreviousPage) setPage((prev) => prev - 1);
  };

  const handleFilter = (field: keyof TransactionFilters, value: string) => {
    setFilterForm((prev) => ({ ...prev, [field]: value || undefined }));
    setPage(1); //reseta para pagina 1 ao filtrar
  }

  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-5 overflow-x-hidden">
      <div className="flex justify-between md:max-h-14 max-md:flex-col max-md:gap-5">
        <div>
          <h1 className="titles">Transações</h1>
          <p className="subtitles text-wrap">
            Visualize e gerencie todas as transações da sua conta.
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Button.Root className="text-charcoal">
            <Button.Icon className="text-charcoal" icon={Download} />
            Exportar CSV
          </Button.Root>
        </div> */}
      </div>

      <div className="bg-midnight-light px-4 py-2 space-y-5 rounded-xl">
        <div className="flex gap-8 max-lg:flex-col justify-between">
          <div className="inputs flex bg-midnight-dark">
            <input
              type="search"
              className="w-full focus:outline-none"
              placeholder="Buscar por Nome..."
              value={filterForm.name ?? ""}
              onChange={(e) => handleFilter("name", e.target.value)} />
            <button onClick={() => { refetch() }}>
              <Search />
            </button>
          </div>
          <Select
            value={filterForm.status ?? ""}
            onChange={(e) => handleFilter("status", e.target.value)} placeholder="Todos os status"
            options={labels} />
          <Select
            value={filterForm.payment_method_id ?? ""}
            onChange={(e) => handleFilter("payment_method_id", e.target.value)}
            placeholder="Todos os Métodos"
            options={payment_methods_id}
          />
        </div>
        <div className="flex items-center gap-5">
          <TextUppercase>FILTROS ATIVOS:</TextUppercase>
          {filterForm.status &&
            <p className="bg-primary/20 rounded-md border px-3 text-primary">{labels[filterForm.status]}
            </p>}
          {filterForm.payment_method_id &&
            <p className="bg-primary/20 rounded-lg px-3 text-primary border">{payment_methods_id[filterForm.payment_method_id]}
            </p>}
        </div>

        <Button.Root onClick={() => refetch()} className="w-full lg:hidden text-black">
          <Button.Icon icon={Search} />
          Buscar
        </Button.Root>
      </div>

      <div className="max-md:overflow-x-scroll overflow-y-hidden border rounded-xl border-[#1E293B] w-full">
        {!isEmpty &&
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
              {transactions.map((transaction, index) => (
                <Table.Body.TransactionRow key={index} transaction={transaction} />
              ))}
            </Table.Body.Root>
          </Table.Root>
        }

        {isLoading &&
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <LoaderCircleIcon className="text-text-gray animate-spin w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Carregando...</p>

            </div>
          </div>
        }
        {isEmpty &&
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowUpDown className="text-text-gray w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Nenhuma transação encontrada</p>
              <p className="text-text-gray text-sm mt-1">
                Suas transações aparecerão aqui assim que forem realizadas.
              </p>
            </div>
          </div>
        }
      </div>


      <div className="flex gap-5 items-center max-md:justify-between">
        <p>{transactions.length} Item | Página {page}</p>
        <div className="flex gap-2">
          <Button.Root className="p-2" disabled={!hasPreviousPage} onClick={previousPage}>
            <Button.Icon icon={ArrowLeft} />
          </Button.Root>
          {!isEmpty && <Button.Root className="p-2" onClick={nextPage}>
            <Button.Icon icon={ArrowRight} />
          </Button.Root>}
        </div>
      </div>
    </div>
  );
}